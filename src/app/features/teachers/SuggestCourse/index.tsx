import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils/callApi';
import { AiButton } from '@ek-components/AiButton';
import { Button } from '@ek-components/Button';
import { BoxContainer } from '@ek-components/Container/BoxContainer';
import { TextArea, TextField, TitleSubMain, useIsMobile } from '@ek-components';
import { Box, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Course } from '@ek-types';
import { useContext, useState } from 'react';
import { FormContainer } from '@ek-components/Container';
import { FormFieldLabels } from '@/constants';
import { displayFlexRow } from '@/utils';
import { ModalContext } from '@ek-components/Modal/ModalContext';
import { useFetchSuggestedCourseQuery } from '@/redux/slices/teacher/teacherCourseApi';

const SuggestCourseForm = ({
  onCourseSuggested,
}: {
  onCourseSuggested: (course: Course) => void;
}) => {
  const [courseSuggest, setCourseSuggest] = useState<{
    title: string;
    description: string;
  }>({
    title: 'MERN stack',
    description: 'MERN stack for developers',
  });

  const { setIsOpen } = useContext(ModalContext);
  const { isError, isLoading, refetch, data } = useFetchSuggestedCourseQuery({
    body: null,
    query: {
      title: courseSuggest?.title,
      description: courseSuggest?.description,
    },
  });
  return (
    <Box>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const { data } = await refetch();

          onCourseSuggested && onCourseSuggested(data?.data as Course);
          setIsOpen && setIsOpen(false);
        }}
      >
        <FormContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <TitleSubMain variant='h6'>
            Let our AI suggest the course details for you. Just provide a title
            and description.
          </TitleSubMain>
          <TextField
            required
            value={courseSuggest?.title || ''}
            onChange={(e) =>
              setCourseSuggest({ ...courseSuggest, title: e.target.value })
            }
            placeholder={FormFieldLabels.COURSE_TITLE}
            label={FormFieldLabels.COURSE_TITLE}
            name='title'
            fullWidth
            sx={{
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          />
          <TextArea
            name='description'
            value={courseSuggest?.description}
            onChange={(e) =>
              setCourseSuggest({
                ...courseSuggest,
                description: e.target.value,
              })
            }
            placeholder={FormFieldLabels.COURSE_DESCRIPTION}
            label={FormFieldLabels.COURSE_DESCRIPTION}
            multiline
            rows={4}
            sx={{
              marginBottom: '1rem',
              width: '100%',
            }}
          />
          <AiButton loading={isLoading} type='submit'>
            Submit
          </AiButton>
        </FormContainer>
      </form>
    </Box>
  );
};

export const SuggestCourse = ({
  onCourseSuggested,
}: {
  onCourseSuggested: (course: Course) => void;
}) => {
  const { setIsOpen, setModalContent } = useContext(ModalContext);
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        ...displayFlexRow,
        justifyContent: 'center',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <TitleSubMain variant='h6'>
        Use AI to generate course details for you
      </TitleSubMain>
      <AiButton
        fullWidth={isMobile}
        color='secondary'
        onClick={() => {
          setModalContent &&
            setModalContent(
              <SuggestCourseForm onCourseSuggested={onCourseSuggested} />
            );

          setIsOpen && setIsOpen(true);
        }}
      >
        Try It
      </AiButton>
    </Box>
  );
};
