import { useCallback } from 'react';
import { Grid } from '@mui/material';
import { TitleSubSection } from '@ek-components';
import { TableWithoutPagination } from '@ek-components/Table';
import { ICourseBatchSession } from '@ek-types';

export const SessionsTable = ({ studentDashboardData }) => {
  const getSessionFn = useCallback(async (): Promise<ICourseBatchSession[]> => {
    return studentDashboardData?.sessions || [];
  }, [studentDashboardData]);

  const sessionColumns = [
    { field: 'courseName', headerName: 'Course Name' },
    { field: 'batchName', headerName: 'Batch Name' },
  ];

  return (
    <Grid item xs={12} md={6}>
      <TitleSubSection>Sessions</TitleSubSection>
      <TableWithoutPagination
        columns={sessionColumns}
        getDataFn={getSessionFn}
      />
    </Grid>
  );
};
