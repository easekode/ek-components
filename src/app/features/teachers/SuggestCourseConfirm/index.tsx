import { Button } from '@ek-components/Button';
import { Box } from '@mui/material';
import { Course } from '@ek-types';
import { useContext } from 'react';
import { AlertContext } from '@ek-components/Alert/AlertContext';
import { useIsMobile } from '@ek-components/hooks';
import { useRouter } from 'next/navigation';
import { useCreateCourseMutation, useFetchCoursesQuery } from '@/redux/slices/teacher/teacherCourseApi';
import { getErrorString, getSuccessString } from '@/utils/responseMessage';

export const SuggestCourseConfirm = ({ course }: { course: Course }) => {
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const [ createCourse, {isError, isLoading }] = useCreateCourseMutation();
  const { refetch } = useFetchCoursesQuery();
  const isMobile = useIsMobile();
  const handleConfirmCourse = async () => {
    if (!showAlert) return;
    try {
      const response = await createCourse({newCourse:course}).unwrap();
      showAlert(getSuccessString(response));
      await refetch();
      router.push('/teacher/courses');
    } catch (error:any) {
      showAlert(getErrorString(error));  
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={handleConfirmCourse}
        loading={isLoading}
        fullWidth={isMobile}
      >
        Save Course
      </Button>
    </Box>
  );
};
