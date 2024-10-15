import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils/callApi/index';
import { Button } from '@ek-components/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import BoxContainer from '../teachers/BatchSummary';
import { Course } from '@ek-types';

interface EnrollCourseProps {
  course: Course;
}

export const EnrollmentForm = (props: EnrollCourseProps) => {
  const [enrollmentStatus, setEnrollmentStatus] = useState('');

  const handleEnrollClick = async () => {
    // try {
    //   const enrollResponse = await getApi(ApiUrl.ENROLL);
    //   debugger;
    //   setEnrollmentStatus(enrollResponse.data.data.data);
    // } catch (error:any) {
    //   console.log(error);
    //   setEnrollmentStatus('Enrollment failed!');
    // }
  };
  return (
    <BoxContainer
      sx={{
        height: '500px',
        // ...flexCenterAlignStyle(),
        flexDirection: 'column',
      }}
    >
      <Typography>{props.course.title}</Typography>
      <Button onClick={handleEnrollClick}>Enroll now</Button>
      {enrollmentStatus && <Typography>{enrollmentStatus}</Typography>}
    </BoxContainer>
  );
};
