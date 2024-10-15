'use client';
import { useContext, useState } from 'react';
import { Box, ButtonProps } from '@mui/material';
import { IExam, NewQuestion, SuggestQuestionInput } from '@ek-types';
import { PreviewExam } from '@/app/features/teachers/CreateExam/PreviewExam';
import { cloneDeep } from '@/utils';
import { SuggestQuestion } from './SuggestQuestion';
import { Button } from '@ek-components/Button';
import { ModalContext } from '@ek-components/Modal/ModalContext';

export const CreateExam = ({
  input,
  onSave,
}: {
  onSave: (data: IExam) => void;
  input: SuggestQuestionInput;
}) => {
  const [suggestedQuestions, setSuggestedQuestions] = useState<any>(null);
  return (
    <Box>
      {!suggestedQuestions ? (
        <SuggestQuestion
          onSuggestQuestion={(questions: NewQuestion[]) => {
            setSuggestedQuestions(questions);
          }}
          input={input}
        />
      ) : (
        <PreviewExam
          onSave={(updated) => {
            // const newSurvey = cloneDeep(updated);
            onSave(updated);
          }}
          survey={suggestedQuestions}
        />
      )}
    </Box>
  );
};

interface CreateExamButtonProps extends ButtonProps {
  onCreateExam: (exam: IExam) => void;
  input: SuggestQuestionInput;
  onSave: (data: IExam) => void;
}

export const CreateExamButton = (props: CreateExamButtonProps) => {
  const { setModalContent, setIsOpen, setDialogProps } =
    useContext(ModalContext);
  return (
    <Button
      onClick={() => {
        setModalContent &&
          setModalContent(
            <CreateExam
              onSave={(exam) => {
                setIsOpen && setIsOpen(false);
                setModalContent && setModalContent(<></>);
                props.onSave(exam);
              }}
              input={props.input}
            />
          );
        setIsOpen && setIsOpen(true);
        setDialogProps &&
          setDialogProps({ title: 'Create Exam', maxWidth: 'xl' });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
