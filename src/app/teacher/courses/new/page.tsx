'use client';
// import { ApiUrl } from '@/config/api';
// import { getApi } from '@/utils/callApi';
import { Box, Typography } from '@mui/material';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Course } from '@ek-types';
import { useEffect, useRef, useState } from 'react';
import { SuggestCourse } from '../../../features/teachers/SuggestCourse';
import { CoursePreview } from '../../../features/CoursePreview';
import { SuggestCourseConfirm } from '../../../features/teachers/SuggestCourseConfirm';
import {
  Button,
  TitleMain,
  TitleSection,
  TitleSubMain,
  TitleSubSection,
  useIsMobile,
} from '@ek-components';
// import { SuggestCourseConfirm } from '../features/SuggestCourseConfirm';
import { cloneDeep, displayFlexColumn, displayFlexRow } from '@/utils';

const defaultCourse: Course = {
  slNo: 1,
  code: 'COURSE001',
  title: '',
  longDescription: '',
  chapters: [
    {
      slNo: 1,
      code: 'CHAP001',
      name: 'Chapter Name',
      topics: [
        { slNo: 1, code: 'TOPIC001', name: 'Topic 1' },
        { slNo: 2, code: 'TOPIC002', name: 'Topic 2' },
      ],
    },
  ],
  seoHead: {},
};

const Courses = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const courseRef = useRef<Course | null>(course);
  const isMobile = useIsMobile();

  useEffect(() => {
    courseRef.current = course;
  }, [course]);

  // const handleSaveCourse = () => {
  //   if (courseRef.current) {
  //     console.log('Course save in DB', courseRef.current);
  //   }
  // };

  return (
    <Box
      maxWidth={'1024px'}
      sx={{
        margin: 'auto',
        // padding: '30px',
        ...displayFlexColumn,
        // alignItems: 'center',
      }}
    >
      {/*   <TitleMain>Hello world!</TitleMain>
      <TitleSubMain>Hello world!</TitleSubMain>
      <TitleSection>Hello world!</TitleSection>
      <TitleSubSection>Subsection</TitleSubSection> */}
      <Box
        sx={{
          ...displayFlexColumn,
          justifyContent: course ? 'flex-start' : 'center',
          alignItems: 'center',
          marginTop: course ? '1rem' : '12rem',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <SuggestCourse onCourseSuggested={setCourse} />
        <Typography>OR</Typography>
        <Button fullWidth={isMobile} onClick={() => setCourse(defaultCourse)}>
          Continue manually
        </Button>
      </Box>
      {/* {JSON.stringify(course, null, 3)} */}
      {course && (
        <CoursePreview
          onDataChange={(data) => {
            const newCourse = cloneDeep(data);
            setCourse(newCourse as Course);
          }}
          course={course}
        />
      )}
      {course && <SuggestCourseConfirm course={course} />}
    </Box>
  );
};

export default Courses;
