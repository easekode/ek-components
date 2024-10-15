import { BoxContainer } from '@/../ek-components/index';
import { useInvitationsQuery } from '@/redux/slices/invitation/invitationsApi';
import {
  TableWithoutPagination,
  TableWithPagination,
} from '@ek-components/Table';
import { TitleSubSection } from '@ek-components/TitleHeader';
import { Box, Table } from '@mui/material';
import { useCallback } from 'react';

const columns = [
  {
    field: 'name',
    headerName: 'Student Name',
    customField: (row: any) => {
      return <>{row?.user?.name} </>;
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    customField: (row: any) => {
      return <>{row?.user?.email} </>;
    },
  },

  {
    field: 'batch',
    headerName: 'Batch',
    customField: (row: any) => {
      return (
        <>
          {row?.batch?.name} | {row?.batch?.code} | {row?.course?.title}
        </>
      );
    },
  },
];

export const RecentlyJoinedStudents = ({ data }: { data: any[] }) => {
  const { refetch } = useInvitationsQuery();
  const getDataFn = useCallback(async (): Promise<any[]> => {
    return data;
  }, [data]);

  return (
    <BoxContainer>
      <TitleSubSection>Recently Joined</TitleSubSection>
      <TableWithoutPagination columns={columns} getDataFn={getDataFn} />
    </BoxContainer>
  );
};
