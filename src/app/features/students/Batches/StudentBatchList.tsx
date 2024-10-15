'use client';

import { getApi, replaceParamsInUrl } from '@/utils';
import { Box, Typography } from '@mui/material';
import {
  ApiResponse,
  PaginatedResult,
  IStudentBatchAssociation,
} from '@ek-types';
import { ApiUrl } from '@/config/api';
import { TableWithPagination } from '@ek-components/Table';
import Link from 'next/link';
import { AppRoutes } from '@/config/appRoutes';
import { useState } from 'react';
import { SearchPaginationTypes } from '@ek-components/Table/types';
import { useQuery } from '@tanstack/react-query';
import { ErrorDisplay, Loading } from '@/../ek-components/index';

const columnFields = (handleLinkClick: () => void) => [
  {
    headerName: 'Batch Name',
    customField: (row: any) => (
      <Link
        href={replaceParamsInUrl(AppRoutes.STUDENT_BATCH_DETAIL, {
          batchId: row.batchId,
        })}
        onClick={handleLinkClick}
      >
        <Typography>{row?.batch?.name}</Typography>
      </Link>
    ),
    field: 'batch',
  },
  {
    headerName: 'Code',
    customField: (row: any) => {
      return <>{row?.batch?.code || ''}</>;
    },
    field: 'code',
  },
  {
    headerName: 'Course',
    customField: (row: any) => {
      return <>{row?.course?.title || ''}</>;
    },
    field: 'course',
  },
];

const fetchData = async (query: SearchPaginationTypes) => {
  const response = await getApi<
    ApiResponse<PaginatedResult<IStudentBatchAssociation>>
  >({
    url: ApiUrl.GET_SUDENT_BATCHES,
    query: query as any,
  });
  return response.data;
};

export const StudentBatchList = () => {
  const [query, setQuery] = useState<SearchPaginationTypes>({
    page: 1,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ['getStudentBatch'],
    enabled: false,
    queryFn: () => fetchData(query),
  });

  const handleLinkClick = () => {
    setLoading(true);
  };

  if (isLoading || loading) {
    return <Loading height='80vh' />;
  }

  if (isError) {
    return <ErrorDisplay message='An error occurred while fetching data' />;
  }

  return (
    <Box>
      <TableWithPagination<IStudentBatchAssociation>
        getDataFn={fetchData}
        columns={columnFields(handleLinkClick)}
      />
    </Box>
  );
};
