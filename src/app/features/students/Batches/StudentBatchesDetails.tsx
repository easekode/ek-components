'use client';

import { Box, Button, Typography } from '@mui/material';
import {
  BoxContainer,
  theme,
  TitleSubSection,
  useModalManager,
} from '@ek-components';
import { TableWithoutPagination } from '@ek-components/Table';
import { formatDate } from '@/utils/dateUtils';
import { CourseBatchTrackerStatus } from '@ek-types';
import { FeedbackModal } from './FeedbackModal';

export const StudentBatchSessions = ({ data }) => {
  const { sessions } = data;

  const { openModal, closeModal } = useModalManager();

  const handleFeedback = (sessionId: string) => {
    openModal(
      <FeedbackModal
        sessionId={sessionId}
        data={data}
        onFeedbackSubmitted={() => {
          closeModal();
        }}
      />
    );
  };
  const getSessionDataFn = async () => {
    return sessions?.data || [];
  };

  const customField = (field: string) => (row: any) => {
    const value = row[field];
    return value ? formatDate(value) : 'N/A';
  };

  const sessionsColumns = [
    { field: 'name', headerName: 'Name' },
    {
      field: 'startDateTime',
      headerName: 'Start',
      customField: customField('startDateTime'),
    },
    {
      field: 'endDateTime',
      headerName: 'End',
      customField: customField('endDateTime'),
    },
    {
      field: 'duration',
      headerName: 'Duration',
      customField: (row: any) => {
        const startDate = new Date(row.startDateTime);
        const endDate = new Date(row.endDateTime);
        const durationInMinutes = Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60)
        );
        return durationInMinutes ? `${durationInMinutes} minutes` : 'N/A';
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      customField: (row: any) => {
        return row.status === CourseBatchTrackerStatus.COMPLETED
          ? 'Completed'
          : row.status;
      },
    },
    {
      field: 'meetingLink',
      headerName: 'Session Link',
      customField: (row: any) => {
        return row.meetingLink ? (
          <Typography
            component='a'
            href={row.meetingLink}
            target='_blank'
            rel='noopener noreferrer'
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {row.meetingLink}
          </Typography>
        ) : (
          'N/A'
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      customField: (row: any) => {
        return row.status === CourseBatchTrackerStatus.COMPLETED ? (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleFeedback(row._id)}
          >
            Feedback
          </Button>
        ) : (
          'N/A'
        );
      },
    },
  ];
  return (
    <BoxContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TitleSubSection>Sessions</TitleSubSection>
      </Box>
      <TableWithoutPagination
        showSl={false}
        getDataFn={getSessionDataFn}
        columns={sessionsColumns}
      />
    </BoxContainer>
  );
};
