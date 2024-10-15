import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrl, baseUrl } from '@/config/api';
import { ApiResponse, StudentAcceptRejectInvitationBody } from '@ek-types';
import { handleError, putApi, getApi } from '@/utils';
import { IInvitation } from '@ek-types';

interface StudentAcceptRejectInvitationResponse {
  status: boolean;
}

interface InvitationResponse {
  data: {
    data: IInvitation[];
    totalResult: number;
  };
}

export const invitationsApi = createApi({
  reducerPath: 'invitationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    invitations: builder.query<InvitationResponse, void>({
      queryFn: async () => {
        try {
          const response = await getApi<InvitationResponse>({
            url: ApiUrl.STUDENT_INVITATIONS,
          });
          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
    acceptRejectInvitation: builder.mutation<
      ApiResponse<StudentAcceptRejectInvitationResponse>,
      StudentAcceptRejectInvitationBody
    >({
      queryFn: async (body) => {
        try {
          const response = await putApi<
            ApiResponse<StudentAcceptRejectInvitationResponse>
          >({
            url: ApiUrl.STUDENT_ACCEPT_REJECT_INVITATION,
            data: body,
          });

          return { data: response };
        } catch (error) {
          return handleError(error);
        }
      },
    }),
  }),
});

export const { useInvitationsQuery, useAcceptRejectInvitationMutation } =
  invitationsApi;
