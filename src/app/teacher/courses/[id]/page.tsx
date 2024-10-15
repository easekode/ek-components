import { UpdateCourse } from '@/app/features/teachers/Courses/UpdateCourse';
import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils';
import { getServerApiCallConfig } from '@/utils/callApi/getServerApiCallConfig';
import { ApiResponse, Course } from '@ek-types';
import { Box } from '@mui/material';

const CourseDetails = async ({ params }: { params: { id: string } }) => {
  try {
    const course = await getApi<ApiResponse<Course>>({
      url: ApiUrl.TEACHER_COURSE_DETAILS,
      params: { id: params.id },
      config: getServerApiCallConfig(),
    });

    return <UpdateCourse course={course.data} />;
  } catch (error: any) {
    return <Box>{error.message}</Box>;
  }
};

export default CourseDetails;
