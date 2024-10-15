import { BoxContainer, ErrorDisplay, Loading } from '@ek-components';
import { TableData, TableWithPagination } from '@ek-components/Table';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ApiUrl } from '@/config/api';
import { getApi, replaceParamsInUrl } from '@/utils';
import { Row, SearchPaginationTypes } from '@ek-components/Table/types';
import Link from 'next/link';
import {
  ApiResponse,
  ICourseBatch,
  ICourseBatchSessionClient,
  PaginatedResult,
} from '@ek-types';
import { useState } from 'react';
import { AppRoutes } from '@/config/appRoutes';

const fetchData = async (query: SearchPaginationTypes) => {
  const result = await getApi<
    ApiResponse<PaginatedResult<ICourseBatchSessionClient>>
  >({
    url: ApiUrl.GET_COURSE_BATCHES,
    query: query as any,
  });
  return result.data;
};

const columnsFields = (handleLinkClick: () => void) => [
  {
    field: 'name',
    headerName: 'Batch Name',
    customField: (row: Row) => (
      <Link
        href={replaceParamsInUrl(AppRoutes.TEACHER_BATCH_DETAIL, {
          batchId: row._id,
        })}
        onClick={handleLinkClick}
      >
        <Typography>{row.name}</Typography>
      </Link>
    ),
  },
  {
    field: 'action',
    headerName: 'Course',
    customField: (row: Row) => <>{row.course.title}</>,
  },
  { field: 'status', headerName: 'Status' },
  { field: 'code', headerName: 'Code' },
  {
    field: 'startDate',
    headerName: 'Start Date',
    customField: (row: Row) => <Box>{row.event?.startDate}</Box>,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    customField: (row: Row) => <Box>{row.event?.endDate}</Box>,
  },
  {
    field: 'timing',
    headerName: 'Timing',
    customField: (row: Row) => (
      <Box>
        {row.event?.startTime} - {row.event?.endTime}
      </Box>
    ),
  },
];

export const MyBatchesTable = ({
  refetch: updateTable = false,
}: {
  refetch: boolean;
}) => {
  const [query, setQuery] = useState<SearchPaginationTypes>({
    page: 1,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);

  const { refetch, isLoading, isError } = useQuery({
    queryKey: ['getCourseBatch'],
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
    <BoxContainer>
      <TableWithPagination<ICourseBatch>
        columns={columnsFields(handleLinkClick)}
        getDataFn={async (
          params: SearchPaginationTypes
        ): Promise<TableData<ICourseBatchSessionClient>> => {
          const { data } = await refetch();
          if (!data?.data) {
            return {
              data: [],
              totalResult: 0,
            };
          }
          return {
            data: data.data,
            totalResult: data.totalResult,
          };
        }}
        loading={isLoading}
        refetch={updateTable}
      />
    </BoxContainer>
  );
};
