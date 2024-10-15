import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils/callApi';
import { Box } from '@mui/material';
import { ExamResult } from '../features/ExamResult';

const MyExams = async () => {
  try {
    const result = await getApi<{
      data: any;
    }>({
      url: ApiUrl.EXAM_TRACKER_BY_STUDENT,
    });

    return (
      <Box>
        {result?.data?.data?.map((row: any, key: number) => {
          const examJson = JSON.parse(row.exam.surveyJson);
          return (
            <Box key={key}>
              <Box>{row.examId}</Box>
              <ExamResult data={row.surveyData} json={examJson} />
            </Box>
          );
        })}
      </Box>
    );
  } catch (error) {
    return <Box>{JSON.stringify(error)}</Box>;
  }
};

export default MyExams;
