'use client';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
// import './index.css';
import { useState } from 'react';
interface ExamData {
  json: string;
  data: Record<string, any>;
}
export function ExamResult({ data, json }: ExamData) {
  const survey = new Model(json);
  survey.data = data;
  survey.mode = 'display';
  /*
  survey.questionsOnPageMode = 'singlePage';
  survey.showNavigationButtons = 'none';
  survey.showProgressBar = 'off';
  survey.showTimerPanel = 'none';
  survey.maxTimeToFinishPage = 0;
  survey.maxTimeToFinish = 0; */
  const correctStr = 'Correct';
  const inCorrectStr = 'Incorrect';

  function getTextHtml(text: any, str: any, isCorrect: boolean) {
    if (text.indexOf(str) < 0) return undefined;
    return (
      text.substring(0, text.indexOf(str)) +
      '<span class=' +
      (isCorrect ? 'correctAnswer' : 'incorrectAnswer') +
      '>' +
      str +
      '</span>'
    );
  }

  function renderCorrectAnswer(q: any) {
    if (!q) return;
    const isCorrect = q.isAnswerCorrect();
    if (!q.prevTitle) {
      q.prevTitle = q.title;
    }
    if (isCorrect === undefined) {
      q.title = q.prevTitle;
    }
    q.title = q.prevTitle + ' ' + (isCorrect ? correctStr : inCorrectStr);
  }

  survey.onValueChanged.add((sender, options) => {
    renderCorrectAnswer(options.question);
  });

  survey.onTextMarkdown.add((sender, options) => {
    var text = options.text;
    var html = getTextHtml(text, correctStr, true);
    if (!html) {
      html = getTextHtml(text, inCorrectStr, false);
    }
    if (!!html) {
      options.html = html;
    }
  });

  survey.getAllQuestions().forEach((q) => renderCorrectAnswer(q));
  return <Survey model={survey} />;
}
