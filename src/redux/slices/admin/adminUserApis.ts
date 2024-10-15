import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl, baseUrl } from '@/config/api';
import { IUser, CreateUserBody, PaginatedResult } from '@ek-types';
import { ApiResponse } from '@ek-types';
import { getApi, postApi, putApi, deleteApi } from '@/utils';
import { ApiBodyInput } from '../types';

const handleError = (error: any) => ({
  error: {
    status: (error as any).status || 500,
    statusText: (error as any).statusText || 'Unknown Error',
    data: (error as any).data || 'Error occurred',
  },
});

export const adminUserApi = createApi({
  reducerPath: 'adminUserApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<ApiResponse<PaginatedResult<IUser>>, void>({
      queryFn: async () => {
        try {
          const response = await getApi<ApiResponse<PaginatedResult<IUser>>>({
            url: ApiUrl.USERS,
          });
          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    addUser: builder.mutation<ApiResponse<IUser>, ApiBodyInput<CreateUserBody>>(
      {
        queryFn: async (input) => {
          try {
            const response = await postApi<ApiResponse<IUser>>({
              url: ApiUrl.CREATE_USER,
              data: input.body,
            });
            return { data: response };
          } catch (error) {
            return handleError(error);
          }
        },
      }
    ),
    editUser: builder.mutation<
      ApiResponse<IUser>,
      ApiBodyInput<Partial<IUser>>
    >({
      queryFn: async ({ body, params }) => {
        try {
          // const { body } = editUserBody;
          const response = await putApi<ApiResponse<IUser>>({
            url: ApiUrl.UPDATE_USER,
            data: body,
            params,
          });
          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    deleteUser: builder.mutation<ApiResponse<void>, ApiBodyInput<undefined>>({
      queryFn: async ({ params }) => {
        try {
          const response = await deleteApi<ApiResponse<void>>({
            url: ApiUrl.DELETE_USER,
            params,
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
  useFetchUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = adminUserApi;
