import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils';
import { getServerApiCallConfig } from '@/utils/callApi/getServerApiCallConfig';
import { BoxContainer } from '@ek-components/Container';
import { ApiResponse, TeacherCourseBatchResponse } from '@ek-types';
import { Box } from '@mui/material';
import { BatchSummary } from '@/app/features/teachers/Batches/BatchSummary';

interface BatchDetailsProps {
  params: {
    batchId: string;
  };
}

const BatchDetails = async ({ params }: BatchDetailsProps) => {
  try {
    const data = await getApi<ApiResponse<TeacherCourseBatchResponse>>({
      url: ApiUrl.TEACHER_COURSE_BATCH_BY_ID,
      params: {
        id: params.batchId,
      },
      config: getServerApiCallConfig(),
    });

    return (
      <BoxContainer>
        {/* {JSON.stringify(data, null, 2)} */}
        <BatchSummary data={data?.data} />
      </BoxContainer>
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default BatchDetails;
