import { Box } from '@mui/material';
import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils/callApi';
import { ExamResult } from '@/app/features/ExamResult';

const ExamResultPage = async () => {
  const getExamResult = async () => {
    try {
      const response = await getApi<{
        data: {
          json: any;
          data: any;
        };
        error: any;
      }>({
        url: ApiUrl.EXAM_RESULT,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  try {
    const {
      data: { json, data },
    } = await getExamResult();

    return (
      <Box>
        <ExamResult json={json} data={data} />
      </Box>
    );
  } catch (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
};

export default ExamResultPage;
