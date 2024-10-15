'use client';
import { TeacherCourses } from '@/app/features/teachers/Courses';
import { SuggestCourse } from '@/app/features/teachers/SuggestCourse';
import { SuggestCourseConfirm } from '@/app/features/teachers/SuggestCourseConfirm';
import { BoxContainer } from '@ek-components/Container';
import { Course } from '@ek-types';
import { useState } from 'react';

const Courses = () => {
  const [course, setCourse] = useState<Course | null>(null);
  return (
    <BoxContainer>
      <TeacherCourses />
    </BoxContainer>
  );
};

export default Courses;
