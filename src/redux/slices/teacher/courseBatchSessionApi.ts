import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl, baseUrl } from '@/config/api';
import { ApiResponse, CourseProgressSchema, EndSessionBody } from '@ek-types';
import { ApiBodyInput } from '../types';
import { putApi } from '@/utils';

export const courseBatchSessionApi = createApi({
  reducerPath: 'courseBatchSessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    endSession: builder.mutation<
      ApiResponse<CourseProgressSchema>,
      ApiBodyInput<EndSessionBody>
    >({
      queryFn: async ({ body, params }) => {
        const result = await putApi<ApiResponse<CourseProgressSchema>>({
          url: ApiUrl.TEACHER_END_COURSE_BATCH_SESSION,
          data: body,
          params: {
            sessionId: params?.sessionId,
          },
        });

        return {
          data: result,
        };
      },
    }),
  }),
});

export const { useEndSessionMutation } = courseBatchSessionApi;
