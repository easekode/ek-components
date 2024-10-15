import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider,
  MenuItem,
} from '@mui/material';
import { Button } from '@ek-components/Button';
import { QuestionComponent } from './QuestionComponent';
import { cloneDeep, postApi } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { ApiUrl } from '@/config/api';
import { IExam, Level, NewExam } from '@ek-types';
import { TitleSubMain } from '@ek-components/TitleHeader';
import { OkCancel } from '@ek-components/OkCancel';
import { UploadFile } from '@ek-components/UploadFile';

interface SurveyChoice {
  value: string;
}

interface SurveyElement {
  type:
    | 'dropdown'
    | 'radiogroup'
    | 'text'
    | 'multipletext'
    | 'checkbox'
    | 'html';
  name?: string;
  title?: string;
  html?: string;
  titleLocation?: string;
  isRequired?: boolean;
  maxLength?: number;
  // choices?: string[] | SurveyChoice[];
  choices?: string[];
  choicesOrder?: string;
}

interface CompletedHtmlCondition {
  expression: string;
  html: string;
}

interface SurveyPage {
  elements: SurveyElement[];
}

interface SurveyJson {
  title: string;
  showProgressBar: string;
  showTimerPanel: string;
  maxTimeToFinishPage: number;
  maxTimeToFinish: number;
  firstPageIsStarted: boolean;
  startSurveyText: string;
  pages: SurveyPage[];
  completedHtml: string;
  completedHtmlOnCondition: CompletedHtmlCondition[];
}

interface SurveyEditorProps {
  survey: SurveyJson;
  onSave: (survey: IExam) => void;
}

export const PreviewExam: React.FC<SurveyEditorProps> = ({
  survey,
  onSave,
}) => {
  const [currentSurvey, setCurrentSurvey] = useState<SurveyJson>(survey);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: NewExam) => {
      return await postApi<IExam>({
        url: ApiUrl.CREATE_EXAM,
        data,
      });
    },
  });

  const handleChange = (field: keyof SurveyJson, value: any) => {
    setCurrentSurvey((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (index: number, page: SurveyPage) => {
    setCurrentSurvey((prev) => {
      const updatedPages = [...prev.pages];
      updatedPages[index] = page;
      return { ...prev, pages: updatedPages };
    });
  };

  const renderTextField = (
    label: string,
    field: keyof SurveyJson,
    value: any,
    type: string = 'text'
  ) => (
    <TextField
      label={label}
      value={value}
      onChange={(e) =>
        handleChange(
          field,
          type === 'number' ? Number(e.target.value) : e.target.value
        )
      }
      fullWidth
      margin='normal'
      type={type}
    />
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit}
      sx={{ paddingTop: 10, paddingBottom: 10 }}
    >
      <TitleSubMain variant='h4' gutterBottom>
        Edit Survey
      </TitleSubMain>
      {renderTextField('Title', 'title', currentSurvey?.title)}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Show Progress Bar'
            select
            value={currentSurvey?.showProgressBar}
            onChange={(e) => handleChange('showProgressBar', e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
          >
            <MenuItem value='top'>Top</MenuItem>
            <MenuItem value='bottom'>Bottom</MenuItem>
            <MenuItem value='none'>None</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Show Timer Panel'
            select
            value={currentSurvey?.showTimerPanel}
            onChange={(e) => handleChange('showTimerPanel', e.target.value)}
            fullWidth
            margin='normal'
            variant='outlined'
          >
            <MenuItem value='top'>Top</MenuItem>
            <MenuItem value='bottom'>Bottom</MenuItem>
            <MenuItem value='none'>None</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField(
            'Max Time to Finish Page (seconds)',
            'maxTimeToFinishPage',
            currentSurvey?.maxTimeToFinishPage,
            'number'
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderTextField(
            'Max Time to Finish Survey (seconds)',
            'maxTimeToFinish',
            currentSurvey?.maxTimeToFinish,
            'number'
          )}
        </Grid>
      </Grid>
      <FormControlLabel
        control={
          <Checkbox
            checked={currentSurvey?.firstPageIsStarted}
            onChange={(e) =>
              handleChange('firstPageIsStarted', e.target.checked)
            }
          />
        }
        label='First Page is Started'
      />
      {renderTextField(
        'Start Survey Text',
        'startSurveyText',
        currentSurvey?.startSurveyText
      )}

      {currentSurvey?.pages?.map((page, index) =>
        page?.elements?.map((el, idx) => (
          <QuestionComponent
            index={idx}
            key={idx}
            question={el as SurveyElement}
            onSubmit={(question) => {
              handlePageChange(index, {
                ...page,
                elements: page.elements.map((q, i) =>
                  i === idx ? question : q
                ),
              });
            }}
          />
        ))
      )}

      <Grid container spacing={2} mt={10}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <UploadFile
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              buttonText='Attachment'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <OkCancel
            primaryProps={{ children: 'Save Questions' }}
            secondaryProps={{ children: 'Cancel' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
