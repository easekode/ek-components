'use client';
import { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
} from '@mui/material';
import {
  BoxContainer,
  TitleSubSection,
  TextArea,
  OkCancel,
  Loading,
  ErrorDisplay,
} from '@ek-components';
import { getApi, postApi } from '@/utils';
import { ApiUrl } from '@/config/api';
import { useQuery } from '@tanstack/react-query';
import { FeedbackType, ResponseInput } from '@ek-types';

interface FeedbackModalProps {
  sessionId: string;
  data: any;
  onFeedbackSubmitted: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  sessionId,
  data,
  onFeedbackSubmitted,
}) => {
  const [ratings, setRatings] = useState<Record<string, number | null>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [yesNoAnswers, setYesNoAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const {
    data: feedbackQuestion,
    isLoading,
    error,
  } = useQuery<ResponseInput>({
    queryKey: ['feedbackTopics'],
    queryFn: () => getApi({ url: ApiUrl.FEEDBACK_TOPICS }),
  });

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    feedbackQuestion?.data.forEach((topic) => {
      if (topic.feedbackType === FeedbackType.RATE) {
        if (ratings[topic.name] === null || ratings[topic.name] === 0) {
          newErrors[topic.name] = 'Rating is required';
        }
      } else if (topic.feedbackType === FeedbackType.DESCRIPTIVE) {
        if (!comments[topic.name]) {
          newErrors[topic.name] = 'Comment is required';
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const feedbackData = {
      batchId: data.batch._id,
      sessionId: sessionId,
      feedbackByTopics: feedbackQuestion?.data.map((topic) => ({
        topicId: topic?._id,
        rating: ratings[topic.name] !== null ? ratings[topic.name] : 0,
        comment: comments[topic.name] || '',
        isChecked: yesNoAnswers[topic.name] === 'yes' ? true : false,
      })),
    };

    {
      const response = await postApi({
        url: ApiUrl.SAVE_FEEDBACK,
        data: feedbackData,
      });

      // console.log('Feedback saved:', response);
      onFeedbackSubmitted();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  return (
    <BoxContainer sx={{ p: 10 }}>
      <TitleSubSection variant='h4'>Feedback</TitleSubSection>

      {feedbackQuestion?.data.map((topic, index) => (
        <BoxContainer key={topic.name}>
          <TitleSubSection variant='subtitle1' gutterBottom>
            {topic.name}
          </TitleSubSection>

          {topic.feedbackType === FeedbackType.RATE && (
            <>
              <Rating
                name={`rating-${index}`}
                value={ratings[topic.name] || 0}
                onChange={(event, newValue) =>
                  setRatings((prev) => ({ ...prev, [topic.name]: newValue }))
                }
                precision={0.5}
              />
              {errors[topic.name] && (
                <TitleSubSection color='error' variant='body2'>
                  {errors[topic.name]}
                </TitleSubSection>
              )}
            </>
          )}

          {topic.feedbackType === FeedbackType.DESCRIPTIVE && (
            <>
              <TextArea
                minRows={4}
                value={comments[topic.name] || ''}
                onChange={(e) =>
                  setComments((prev) => ({
                    ...prev,
                    [topic.name]: e.target.value,
                  }))
                }
                placeholder='Write your feedback here...'
              />
              {errors[topic.name] && (
                <TitleSubSection color='error' variant='body2'>
                  {errors[topic.name]}
                </TitleSubSection>
              )}
            </>
          )}

          {topic.feedbackType === FeedbackType.YES_NO && (
            <FormControl component='fieldset'>
              <RadioGroup
                row
                name={`yes-no-${index}`}
                value={yesNoAnswers[topic.name] || 'yes'}
                onChange={(e) =>
                  setYesNoAnswers((prev) => ({
                    ...prev,
                    [topic.name]: e.target.value,
                  }))
                }
              >
                <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          )}
        </BoxContainer>
      ))}

      <OkCancel
        primaryProps={{
          onClick: handleSubmit,
          disabled: isLoading,
          children: isLoading ? 'Loading...' : 'Submit',
        }}
        secondaryProps={{}}
      />
    </BoxContainer>
  );
};
