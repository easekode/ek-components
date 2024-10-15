import { useCallback } from 'react';
import { Grid } from '@mui/material';
import { TitleSubSection } from '@ek-components';
import { TableWithoutPagination } from '@ek-components/Table';
import { SessionAttendanceStatusChip } from '@/app/features/StatusChip';
import { IExamTracker } from '@ek-types';

export const Assessments = ({ studentDashboardData }) => {
  const getAssessmentsFn = useCallback(async (): Promise<IExamTracker[]> => {
    return studentDashboardData?.exams || [];
  }, [studentDashboardData]);

  const assessmentColumns = [
    { field: 'topicsName', headerName: 'Name' },
    { field: 'start', headerName: 'Start Date' },
    { field: 'end', headerName: 'End Date' },
    {
      field: 'status',
      headerName: 'Status',
      customField: (row: any) => (
        <SessionAttendanceStatusChip status={row.status} />
      ),
    },
  ];

  return (
    <Grid item xs={12} md={6}>
      <TitleSubSection>Assessments</TitleSubSection>
      <TableWithoutPagination
        columns={assessmentColumns}
        getDataFn={getAssessmentsFn}
      />
    </Grid>
  );
};
