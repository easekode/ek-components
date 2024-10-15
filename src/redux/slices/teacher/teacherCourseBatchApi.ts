import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl, baseUrl } from '@/config/api';
import {
  ApiResponse,
  TeacherCourseBatchResponse,
} from '@ek-types';
import { getApi, handleError } from '@/utils';

export const teacherCourseBatchApi = createApi({
  reducerPath: 'teacherCourseBatchApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    fetchTeacherCourseBatch: builder.query<ApiResponse<TeacherCourseBatchResponse>,
      { params: { batchId: string } }
    >({
      queryFn: async ({ params }) => {
        try {
          const response = await getApi<
            ApiResponse<TeacherCourseBatchResponse>
          >({
            url: ApiUrl.TEACHER_COURSE_BATCH_BY_ID,
            params: { id: params.batchId },
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
  }),
});

export const {
  useFetchTeacherCourseBatchQuery,
} = teacherCourseBatchApi;
