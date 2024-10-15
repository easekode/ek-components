'use client';
import { Course, CourseStatus } from '@ek-types';
import { CoursePreview } from '../../CoursePreview';
import {
  BoxContainer,
  Button,
  TitleSubMain,
  useIsMobile,
} from '@ek-components';

import { useContext, useState } from 'react';
import { useTheme } from '@mui/material';
import { useDraftCourseMutation, useFetchCoursesQuery, usePublishCourseMutation } from '@/redux/slices/teacher/teacherCourseApi';
import { useRouter } from 'next/navigation';
import { getErrorString, getSuccessString } from '@/utils/responseMessage';
import { AlertContext } from '@ek-components/Alert/AlertContext';
import { removeFields } from '@/utils/removeFields';
import { ApiUrl } from '@/config/api';

export const UpdateCourse = ({ course }: { course: Course }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const router = useRouter();
  const [courseData, setCourseData] = useState<Course>(course);
  const [publishCourse, { data: publishCourseData, isLoading }] = usePublishCourseMutation();
  const { refetch } = useFetchCoursesQuery();
  const { showAlert } = useContext(AlertContext);
  const [draftCourse] = useDraftCourseMutation();

  const handleSuccess = async (result: any) => {
    showAlert(getSuccessString(result));
    await refetch();
    router.push(ApiUrl.TEACHER_COURSES);
  };

  const handlePublishCourse = async() =>{
    try{
       const result = await publishCourse({
        params: {
          courseId: String(course._id),
        },
       }).unwrap(); 

       if(result && !isLoading)
        {
          await handleSuccess(result);
        }
    }catch(error:any)
    {
      showAlert(getErrorString(error));  
    }
  }

  const handleDraftCourse = async() =>{
    try{

      const fieldsToRemove = ['_id', 'createdAt', 'updatedAt', '__v'];
      const updatedCourseData = removeFields({
      ...courseData,
      status: CourseStatus.DRAFT,
      }, fieldsToRemove);

      const result = await draftCourse({
      body: updatedCourseData,
      params: {
        courseId: String(course._id),
      },
       }).unwrap();

       if(result)
        {
          await handleSuccess(result);
        }
    }catch(error:any)
    {
      showAlert(getErrorString(error));  
    }
  }
  return (
    <BoxContainer>
      <TitleSubMain variant='h6'>
        <span style={{ color: theme.palette.secondary.main }}> COURSE :</span>{' '}
        {course.title}
      </TitleSubMain>
      <TitleSubMain variant='h6'>
        <strong>Description :</strong>
        {course.longDescription}
      </TitleSubMain>
      <BoxContainer>
        <CoursePreview
          course={courseData}
          onDataChange={(data) => {
            setCourseData(() => data);
          }}
        />
        <BoxContainer
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 10,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant='outlined'
            fullWidth={isMobile}
            sx={{
              padding: '0.5rem',
              color: `${theme.palette.secondary.light}`,
              px: '1rem',
            }}
            onClick={handleDraftCourse}
            loading={isLoading}
          >
            Save as draft
          </Button>
          <Button
            fullWidth={isMobile}
            sx={{
              padding: '0.5rem',
              px: '1rem',
            }}
            onClick={handlePublishCourse}
            loading={isLoading}
          >
            Save & Publish
          </Button>
        </BoxContainer>
      </BoxContainer>
    </BoxContainer>
  );
};
