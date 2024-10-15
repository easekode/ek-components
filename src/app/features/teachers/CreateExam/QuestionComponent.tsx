import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  IconButton,
  Box,
  Checkbox,
  Radio,
  Divider,
} from '@mui/material';
import { Button, theme } from '@ek-components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { BoxContainer, DraggableTable } from '../../../../../ek-components';
import { SurveyElement } from '@/lib/questionaire/types';
import { displayFlexColumn } from '@/utils';
import { Check } from '@mui/icons-material';

interface QuestionFormProps {
  question: SurveyElement;
  index: number;
  onSubmit: (question: SurveyElement) => void;
}

export const QuestionComponent: React.FC<QuestionFormProps> = ({
  question: initialQuestion,
  index,
  onSubmit,
}) => {
  const [question, setQuestion] = useState<SurveyElement>(initialQuestion);
  const [newChoice, setNewChoice] = useState<string>('');
  const [editMode, setEditMode] = useState<{ [index: number]: boolean }>({});
  const [titleEditMode, setTitleEditMode] = useState<boolean>(false);

  const updateQuestion = (updatedValues: Partial<SurveyElement>) => {
    setQuestion((prev) => ({ ...prev, ...updatedValues }));
  };

  const handleAddChoice = () => {
    setNewChoice('');
    updateQuestion({
      choices: [...(question.choices || []), newChoice],
    });
  };

  const handleEditChoice = (index: number, newValue: string) => {
    updateQuestion({
      choices: question.choices?.map((choice, i) =>
        i === index ? newValue : choice
      ),
    });
    setEditMode((prev) => ({ ...prev, [index]: false }));
  };

  const handleRemoveChoice = (choiceToRemove: string) => {
    updateQuestion({
      choices: question.choices?.filter((choice) => choice !== choiceToRemove),
    });
  };

  const handleCorrectAnswerChange = (choice: string, checked: boolean) => {
    const currentAnswers = question.correctAnswer || [];
    updateQuestion({
      correctAnswer: checked
        ? [...currentAnswers, choice]
        : currentAnswers.filter((answer) => answer !== choice),
    });
  };

  const handleSaveTitle = (newTitle: string) => {
    updateQuestion({ title: newTitle });
    setTitleEditMode(false);
  };

  return (
    <BoxContainer
      sx={{ margin: 'auto', paddingTop: '10px', ...displayFlexColumn }}
      component={'form'}
      onSubmit={() => onSubmit(question)}
    >
      <TextField
        label='Type'
        select
        value={question?.type}
        sx={{ background: theme.palette.grey[300], marginLeft: 'auto' }}
        onChange={(e) =>
          updateQuestion({
            type: e.target.value as SurveyElement['type'],
            correctAnswer: [],
          })
        }
      >
        <MenuItem value='radiogroup'>Single Choice Question</MenuItem>
        <MenuItem value='checkbox'>Multiple Choice Question</MenuItem>
      </TextField>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ marginRight: 2 }}>{index + 1}.</Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {titleEditMode ? (
            <>
              <TextField
                label='Title'
                fullWidth
                placeholder='Question would be written here'
                value={question?.title}
                onChange={(e) =>
                  setQuestion((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <IconButton
                edge='end'
                aria-label='save'
                onClick={() => handleSaveTitle(question.title || '')}
              >
                <Check />
              </IconButton>
              <IconButton
                edge='end'
                aria-label='cancel'
                onClick={() => setTitleEditMode(false)}
              >
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{ flex: 1 }}>{question?.title}</Box>
              <IconButton
                edge='end'
                aria-label='edit'
                onClick={() => setTitleEditMode(true)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <DraggableTable
        headings={[]}
        onChangeRows={() => {}}
        rowRenderer={({ row, index }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: theme.palette.grey[200],
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            {question.type === 'radiogroup' ? (
              <Radio
                checked={question.correctAnswer?.includes(row.choice)}
                onChange={() => updateQuestion({ correctAnswer: [row.choice] })}
              />
            ) : (
              <Checkbox
                checked={question.correctAnswer?.includes(row.choice)}
                onChange={(e) =>
                  handleCorrectAnswerChange(row.choice, e.target.checked)
                }
              />
            )}
            {editMode[index] ? (
              <>
                <TextField
                  placeholder='Enter Choice'
                  fullWidth
                  value={row.choice}
                  onChange={(e) => handleEditChoice(index, e.target.value)}
                />
                <IconButton
                  edge='end'
                  aria-label='save'
                  onClick={() => handleEditChoice(index, row.choice)}
                >
                  <Check />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='cancel'
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, [index]: false }))
                  }
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    flex: 1,
                    color: theme.palette.grey[600],
                    marginRight: '10px',
                  }}
                >
                  {row.choice}
                </Box>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={() =>
                    setEditMode((prev) => ({ ...prev, [index]: true }))
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => handleRemoveChoice(row.choice)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        )}
        rows={question.choices?.map((choice) => ({ choice })) || []}
      />

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={handleAddChoice}
          variant='text'
          sx={{ fontStyle: 'initial', color: theme.palette.secondary.main }}
        >
          + Add Another Options
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          label='Correct Answer'
          select
          sx={{ flex: 8, marginBottom: '10px' }}
          value={
            question.type === 'checkbox'
              ? question.correctAnswer
              : [question.correctAnswer]
          }
          onChange={(e) =>
            updateQuestion({
              correctAnswer: Array.isArray(e.target.value)
                ? e.target.value
                : [e.target.value],
            })
          }
          SelectProps={{ multiple: question.type === 'checkbox' }}
        >
          {question.choices?.map((choice, index) => (
            <MenuItem key={index} value={choice}>
              {choice}
            </MenuItem>
          ))}{' '}
        </TextField>
      </Box>
    </BoxContainer>
  );
};
