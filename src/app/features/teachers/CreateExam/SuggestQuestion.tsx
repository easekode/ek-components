import { ApiUrl } from '@/config/api';
import { postApi } from '@/utils/callApi';
import { Button, TextField, TitleSubMain } from '@ek-components';
import { Level, NewQuestion, SuggestQuestionInput } from '@ek-types';
import { Box, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { PreviewExam } from './PreviewExam';
import { SurveyJson } from '../../../../lib/questionaire/types';
import { LevelChoose } from '../../LevelChoose';

const emptySurvey: SurveyJson = {
  title: '',
  showProgressBar: '',
  showTimerPanel: '',
  maxTimeToFinishPage: 0,
  maxTimeToFinish: 0,
  firstPageIsStarted: false,
  startSurveyText: '',
  pages: [{ elements: [] }],
  completedHtml: '',
  completedHtmlOnCondition: [],
};

export const SuggestQuestion = ({
  onSuggestQuestion,
  input,
}: {
  onSuggestQuestion: (questions: NewQuestion[]) => void;
  input?: SuggestQuestionInput;
}) => {
  const [suggestQuestionInput, setSuggestQuestionInput] =
    useState<SuggestQuestionInput>(input || {});

  const [suggestion, setSuggestion] = useState<SurveyJson | null>(null);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () =>
      postApi<{
        data: SurveyJson;
      }>({
        url: ApiUrl.SUGGEST_QUESTIONS,
        data: suggestQuestionInput,
      }),
  });

  const handleInputChange =
    (key: keyof SuggestQuestionInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSuggestQuestionInput({
        ...suggestQuestionInput,
        [key]: e.target.value,
      });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await mutateAsync();
      setSuggestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: '50vw', margin: 'auto' }}>
      {suggestion ? (
        <PreviewExam
          survey={suggestion}
          onSave={(data) => {
            console.log({ data });
          }}
        />
      ) : (
        <Box
          component={'form'}
          onSubmit={handleSubmit}
          sx={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Box
            sx={{
              gap: 4,
              display: 'flex',
              flexDirection: 'column',
              padding: 10,
              margin: 'auto',
            }}
          >
            <TitleSubMain variant='h4' gutterBottom>
              Create Test
            </TitleSubMain>
            <TextField
              label='Course'
              sx={{ paddingBottom: 5 }}
              value={suggestQuestionInput.course}
              onChange={handleInputChange('course')}
            />
            <TextField
              label='Chapter'
              sx={{ paddingBottom: 5 }}
              value={suggestQuestionInput.chapter}
              onChange={handleInputChange('chapter')}
            />
            <TextField
              label='Topics'
              multiline
              rows={3}
              sx={{ paddingBottom: 5 }}
              value={suggestQuestionInput.topics}
              onChange={handleInputChange('topics')}
            />
            <Grid container spacing={2} sx={{ paddingBottom: 5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='Number of questions'
                  value={suggestQuestionInput.questionCount}
                  onChange={handleInputChange('questionCount')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LevelChoose
                  onChange={(e) => {
                    setSuggestQuestionInput({
                      ...suggestQuestionInput,
                      level: e.target.value as Level,
                    });
                  }}
                  value={suggestQuestionInput.level}
                />
              </Grid>
            </Grid>
            <Button
              loading={isPending}
              type='submit'
              sx={{
                display: 'flex',
                padding: '1rem',
                margin: 'auto',
                width: '20%',
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
