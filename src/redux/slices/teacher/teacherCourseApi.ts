import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl, baseUrl } from '@/config/api';
import {
  ApiResponse,
  Course,
  PaginatedResult,
  ICourseBatchSession,
  RequestInput,
} from '@ek-types';
import { getApi, handleError, postApi, putApi } from '@/utils';
import { ApiBodyInput } from '../types';

export const teacherCourseApi = createApi({
  reducerPath: 'teacherCourseApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    fetchCourses: builder.query<ApiResponse<PaginatedResult<Course>>, void>({
      queryFn: async () => {
        try {
          const response = await getApi<ApiResponse<PaginatedResult<Course>>>({
            url: ApiUrl.TEACHER_COURSES_BY_AUTHOR,
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    createCourse: builder.mutation<ApiResponse<Course>, { newCourse: Course }>({
      queryFn: async ({ newCourse }) => {
        try {
          const response = await postApi<ApiResponse<Course>>({
            url: ApiUrl.CONFIRM_SUGGESTED_COURSE,
            data: newCourse,
          });
          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    fetchCourseBatchSessions: builder.query<
      ApiResponse<PaginatedResult<ICourseBatchSession>>,
      RequestInput<null>
    >({
      queryFn: async ({ params, query }) => {
        try {
          const response = await getApi<
            ApiResponse<PaginatedResult<ICourseBatchSession>>
          >({
            url: ApiUrl.TEACHER_COURSE_BATCH_SESSIONS_BY_BATCH_ID,
            params: { id: params?.batchId },
            query,
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    createCourseBatchSession: builder.mutation<
      ApiResponse<ICourseBatchSession>,
      { batchId: string }
    >({
      queryFn: async ({ batchId }) => {
        try {
          const response = await postApi<ApiResponse<ICourseBatchSession>>({
            url: ApiUrl.TEACHER_COURSE_BATCH_STARTSESSION_BY_BATCH_ID,
            data: { batchId },
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    fetchSuggestedCourse: builder.query<
      ApiResponse<Course>,
      ApiBodyInput<null>
    >({
      queryFn: async (input) => {
        try {
          const response = await getApi<ApiResponse<Course>>({
            url: ApiUrl.SUGGEST_COURSE,
            query: input.query,
          });
          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    publishCourse: builder.mutation<
      ApiResponse<Course>,
      { params: { courseId: string } }
    >({
      queryFn: async ({ params }) => {
        try {
          const response = await putApi<ApiResponse<Course>>({
            url: ApiUrl.PUBLISH_COURSE,
            params: { id: params.courseId },
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),

    draftCourse: builder.mutation<ApiResponse<Course>, ApiBodyInput<Course>>({
      queryFn: async ({ body, params }) => {
        try {
          const response = await putApi<ApiResponse<Course>>({
            url: ApiUrl.UPDATE_COURSE,
            data: body,
            params: { id: params?.courseId },
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
  useFetchCoursesQuery,
  useCreateCourseMutation,
  useFetchCourseBatchSessionsQuery,
  useCreateCourseBatchSessionMutation,
  useFetchSuggestedCourseQuery,
  usePublishCourseMutation,
  useDraftCourseMutation,
} = teacherCourseApi;
