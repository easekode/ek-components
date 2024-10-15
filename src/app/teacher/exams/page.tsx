'use client';

import { getApi } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import {
  defaultPaginatedParams,
  IExam,
  IGetPaginationParams,
  PaginatedResult,
} from '@ek-types';
import { ApiUrl } from '@/config/api';
import { Box } from '@mui/material';
import { TitleSubSection } from '@ek-components/TitleHeader';
import { EkTable } from '@ek-components';
import { Button } from '@ek-components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TeacherExams = () => {
  const router = useRouter();
  const { refetch, isLoading, isError, data } = useQuery({
    queryKey: ['teacherCourses'],
    enabled: false,
    queryFn: () =>
      getApi<{ totalResult: number; data: IExam[] }>({
        url: ApiUrl.TEACHER_EXAMS,
        query: params as any,
      }),
  });
  const [params, setParams] = useState<IGetPaginationParams>(
    defaultPaginatedParams
  );

  return (
    <Box>
      <TitleSubSection>Assessments created</TitleSubSection>
      <EkTable<IExam>
        tableData={data as PaginatedResult<IExam>}
        params={params}
        onParamsChange={(params) => {
          setParams((prevParams) => {
            return {
              ...prevParams,
              ...params,
            };
          });
        }}
        columns={[
          {
            field: 'title',
            headerName: 'Exam Name',
            customField: (row) => {
              return (
                <Box
                  onClick={() => {
                    router.push(`/teacher/exams/${row._id}`);
                  }}
                >
                  {row.title}
                </Box>
              );
            },
          },
          {
            field: 'level',
            headerName: 'Level',
          },
          {
            field: 'tags',
            headerName: 'Tags',
          },
          {
            field: 'duration',
            headerName: 'Actions',
            customField: (row) => {
              return (
                <Box>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      router.push(`/teacher/assessments/${row._id}`);
                    }}
                  >
                    View
                  </Button>
                </Box>
              );
            },
          },
        ]}
        loading={isLoading}
      />
    </Box>
  );
};

export default TeacherExams;
