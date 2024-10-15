'use client';

import { PreviewExam } from '@/app/features/teachers/CreateExam/PreviewExam';
import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
const ExamDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['teacherExam'],
    // enabled: false,
    queryFn: () =>
      getApi<{
        surveyJson: string;
      }>({
        url: ApiUrl.TEACHER_EXAM_DETAILS,
        params: {
          id: id as string,
        },
      }),
  });

  if (isError) return <div>{JSON.stringify(error)}</div>;

  //   return <div>{isLoading ? 'Loading...' : JSON.stringify(data?.data)}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {/* {data?.data?.surveyJson} */}
      {/* {data?.data?.surveyJson && JSON.parse(data?.data?.surveyJson).title} */}
      <PreviewExam
        survey={data?.surveyJson && JSON.parse(data?.surveyJson)}
        onSave={() => {}}
        // onSubmit={() => {}}
      />
    </>
  );
};

export default ExamDetails;
