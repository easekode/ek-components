import {
  TableWithoutPagination,
  TableWithPagination,
} from '@ek-components/Table/index';
import { BoxContainer } from '@ek-components/Container';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { TitleSubSection } from '@ek-components/TitleHeader';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
  },
];

export const LiveUpdates = () => {
  const getDataFn = useCallback(async (): Promise<any[]> => {
    return Promise.resolve([
      {
        name: 'Name 1',
      },
      {
        name: 'Name 2',
      },
    ]);
  }, []);
  return (
    <BoxContainer>
      <TitleSubSection>Live Updates</TitleSubSection>
      <TableWithoutPagination columns={columns} getDataFn={getDataFn} />
    </BoxContainer>
  );
};
