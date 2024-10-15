import { ModalContext } from '@ek-components/Modal/ModalContext';
import React, { useContext } from 'react';
import { Course } from '@ek-types';
import { Button } from '@ek-components/Button';
import { EnrollmentForm } from '../EnrollmentForm/index';

interface EnrollCourseProps {
  course: Course;
}

export const EnrollButton = (props: EnrollCourseProps) => {
  const { setIsOpen, setModalContent } = useContext(ModalContext);

  const handleEnrollButton = () => {
    if (setModalContent && setIsOpen) {
      setIsOpen(true);
      setModalContent(<EnrollmentForm course={props.course} />);
    }
  };

  return (
    <>
      <Button onClick={handleEnrollButton}>enroll</Button>
    </>
  );
};
