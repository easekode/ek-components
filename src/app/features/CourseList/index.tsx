import { getApi } from '../../../utils/callApi';
import { useEffect, useState } from 'react';
import { ApiUrl } from '../../../config/api';
import { EnrollButton } from '../EnrollButton/index';
import { displayFlexRow } from '@/utils';
import { BoxContainer } from '@ek-components';
import { Course } from '@ek-types';

export const CourseList = () => {
  const [courses, setCourses] = useState([]);

  const renderCard = (course: Course) => {
    return <>component not implemented {course.title}</>;
    /*  return (
      <CourseCardDetails
        data={course}
        descriptionType={DescriptionType.SHORT}
        renderCTA={() => {
          return (
            <BoxContainer sx={{ ...displayFlexRow }}>
              <EnrollButton course={course} />
            </BoxContainer>
          );
        }}
      />
    ); */
  };

  /*   useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getApi(ApiUrl.COURSES);
        setCourses(result.data.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []); */
  return (
    <>
      course list not implememnted
      {/* <CourseCardGridList courses={courses} renderCard={renderCard} /> */}
    </>
  );
};
