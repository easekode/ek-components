import React from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { SurveyJson } from './types';
import { useMutation } from '@tanstack/react-query';
// import { StudentExamAnswer } from '@ek-types';
import { postApi } from '@/utils/callApi';
import { ApiUrl } from '@/config/api';
import { Schema } from 'mongoose';
export function Questionaire({
  json,
  assesmentId,
}: {
  assesmentId: Schema.Types.ObjectId | string;
  json: SurveyJson;
}) {
  const { mutateAsync, isPending, isError, error } = useMutation({
    // mutationFn: async (data: StudentExamAnswer) => {
    mutationFn: async (data: any) => {
      await postApi({
        url: ApiUrl.SUBMIT_EXAM,
        data,
        params: {
          id: assesmentId as unknown as string,
        },
      });
    },
  });

  const survey = new Model(json);
  survey.onComplete.add((sender, options) => {
    options.showDataSaving();
    mutateAsync({
      data: survey.data,
      examId: assesmentId as Schema.Types.ObjectId,
    })
      .then(() => {
        //@TODO: display success message
      })
      .catch((error) => {});
  });

  return <Survey model={survey} />;
}

/* const json: SurveyJson = {
    showProgressBar: 'top',
    showTimerPanel: 'top',
    startSurveyText: 'Start Quiz',
    title: 'American History Quiz',
    completedHtml: '<h2>Thank you for taking the survey!</h2>',
    completedHtmlOnCondition: [
      {
        expression: '{nps_score} > 8',
        html: '<h2>Thank you for taking the survey!</h2>',
      },
    ],
    firstPageIsStarted: true,
    maxTimeToFinish: 180,
    maxTimeToFinishPage: 20,
    pages: [
      {
        elements: [
          {
            type: 'html',
            html: 'You are about to start a quiz on American history. <br>You will have 10 seconds for every question and 25 seconds to end the quiz.<br>Enter your name below and click <b>Start Quiz</b> to begin.',
          },
          {
            type: 'text',
            name: 'username',
            titleLocation: 'hidden',
            isRequired: true,
            maxLength: 25,
          },
        ],
      },
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'civilwar',
            title: 'When was the American Civil War?',
            choices: ['1796-1803', '1810-1814', '1861-1865', '1939-1945'],
          },
        ],
      },
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'libertyordeath',
            title: 'Whose quote is this: 'Give me liberty, or give me death'?',
            choicesOrder: 'random',
            choices: [
              'John Hancock',
              'James Madison',
              'Patrick Henry',
              'Samuel Adams',
            ],
          },
        ],
      },
      {
        elements: [
          {
            type: 'radiogroup',
            name: 'magnacarta',
            title: 'What is Magna Carta?',
            choicesOrder: 'random',
            choices: [
              'The foundation of the British parliamentary system',
              'The Great Seal of the monarchs of England',
              'The French Declaration of the Rights of Man',
              'The charter signed by the Pilgrims on the Mayflower',
            ],
          },
        ],
      },
    ],
  }; */
