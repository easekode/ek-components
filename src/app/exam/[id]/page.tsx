'use client';
import { ApiUrl } from '@/config/api';
import { getApi } from '@/utils/callApi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Questionaire } from '../../../lib/questionaire';
import { SurveyJson } from '../../../lib/questionaire/types';

const Exam = () => {
  const params = useParams();
  const [exam, setExam] = useState<SurveyJson | null>(null);
  const { data, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ['exam'],
    queryFn: () =>
      getApi<{
        data: {
          surveyJson: string;
        };
      }>({
        url: ApiUrl.GET_EXAM,
        params: { id: params.id as string },
      }),
  });

  useEffect(() => {
    if (params.id) {
      console.log('calling refetch');
      refetch();
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      /* eslint-disable-line */
      setExam(JSON.parse(data?.data.surveyJson)); // @TODO: fix this
    }
  }, [data]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return exam && <Questionaire assesmentId={params.id as string} json={exam} />;
};

export default Exam;
