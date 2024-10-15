'use client';

import {
  BoxContainer,
  EkTable,
  TitleSubSection,
  useModalManager,
} from '@ek-components';
import { Box, Button } from '@mui/material';
import { TableWithoutPagination } from '@ek-components/Table';
import { useFetchCourseBatchSessionsQuery } from '@/redux/slices/teacher/teacherCourseApi';
import { formatDate } from '@/utils/dateUtils';
import { StartSession } from '@/app/features/teachers/Batches/StartSession';
import { useCallback, useState } from 'react';
import { EndSessionModal } from '@/app/features/teachers/Batches/EndSessionModal';
import {
  CourseBatchTrackerStatus,
  defaultPaginatedParams,
  ICourseBatch,
  ICourseBatchSession,
  IGetPaginationParams,
  PaginatedResult,
} from '@ek-types';

interface BatchSessionsProps {
  batch: ICourseBatch;
  onSessionEnded: () => void;
}

export const BatchSessions = ({
  batch,
  onSessionEnded,
}: BatchSessionsProps) => {
  const [paginationParams, setPaginationParams] =
    useState<IGetPaginationParams>(defaultPaginatedParams);

  const {
    data: teacherCourseBatchSessionsData,
    refetch,
    isLoading,
  } = useFetchCourseBatchSessionsQuery({
    params: { batchId: String(batch._id) },
    query: paginationParams,
  });

  const { openModal, closeModal } = useModalManager();

  const handleNewSessionCreated = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEndSession = (sessionId: string) => {
    const sessionData = teacherCourseBatchSessionsData?.data?.data.find(
      (session) => session._id === sessionId
    );

    if (sessionData) {
      const sessionWithBatchData = {
        ...sessionData,
        batch: batch,
      };

      openModal(
        <EndSessionModal
          sessionId={sessionId}
          courseBatch={batch}
          isLoading={isLoading}
          onSessionEnded={() => {
            refetch();
            onSessionEnded();
            closeModal();
          }}
        />
      );
    }
  };

  const customField = (field: string) => (row: any) => {
    const value = row[field];
    return value ? formatDate(value) : 'N/A';
  };

  const handleStartSession = (sessionId: string) => {};

  const sessionsColumns = [
    { field: 'name', headerName: 'Name' },
    {
      field: 'startDateTime',
      headerName: 'Start',
      customField: customField('startDateTime'),
    },
    {
      field: 'endDateTime',
      headerName: 'Attendance',
      customField: (row: any) => {
        return <>12</>;
      },
    },
    {
      field: 'duration',
      headerName: 'Ratings',
      customField: (row: any) => {
        return (
          <>
            {(row.status === CourseBatchTrackerStatus.COMPLETED && '4.5 / 5') ||
              'NA'}{' '}
          </>
        );
      },
    },

    { field: 'status', headerName: 'Status' },

    {
      field: 'action',
      headerName: 'Action',
      customField: (row: any) => {
        if (row.status === CourseBatchTrackerStatus.NOT_STARTED) {
          return (
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleStartSession(row._id as string)}
            >
              Start
            </Button>
          );
        }

        if (row.status === CourseBatchTrackerStatus.COMPLETED) {
          return <Button variant='contained'>View </Button>;
        }

        return (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleEndSession(row._id as string)}
          >
            End
          </Button>
        );
        // }
      },
    },
  ];

  return (
    <BoxContainer>
      {/* {JSON.stringify(teacherCourseBatchSessionsData, null, 2)} */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TitleSubSection>Sessions</TitleSubSection>
        <StartSession
          batchId={String(batch._id)}
          onNewSessionCreated={handleNewSessionCreated}
        >
          Start Session
        </StartSession>
      </Box>
      <EkTable
        params={paginationParams}
        onParamsChange={(params) =>
          setPaginationParams((prevParams) => {
            return {
              ...prevParams,
              ...params,
            };
          })
        }
        tableData={
          teacherCourseBatchSessionsData?.data as PaginatedResult<ICourseBatchSession>
        }
        columns={sessionsColumns}
      />
    </BoxContainer>
  );
};
