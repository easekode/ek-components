import { getApi } from '@/utils';
import { ApiResponse, StudentDashboardResponse } from '@ek-types';
import { ApiUrl } from '@/config/api';
import { BoxContainer, ErrorDisplay, Loading } from '@ek-components';
import { StudentBatchesSummary } from '@/app/features/students/Batches/StudentBatchesSummary';
import { getServerApiCallConfig } from '@/utils/callApi/getServerApiCallConfig';
import Layout from '@/app/features/Layout/layout';
import { studentDrawerItems } from '@/app/features/Layout/drawerItems';

const StudentBatchesDashboard = async ({
  params,
}: {
  params: { batchId: string };
}) => {
  // const batchId = '66c2e7bec700b800f9345077';
  try {
    const data = await getApi<ApiResponse<StudentDashboardResponse>>({
      url: ApiUrl.STUDENT_BATCH_INFO_BY_ID,
      params: {
        id: params.batchId,
      },
      config: getServerApiCallConfig(),
    });

    return (
      <BoxContainer>
        <Layout menu={studentDrawerItems}>
          {data && <StudentBatchesSummary data={data.data} />}
        </Layout>
      </BoxContainer>
    );
  } catch (error: any) {
    return <ErrorDisplay message={error.message} />;
  }
};
export default StudentBatchesDashboard;
