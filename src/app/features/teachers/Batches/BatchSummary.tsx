'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Stat,
  TitleMain,
  TitleSubMain,
  TitleSubSection,
  useIsMobile,
} from '@ek-components';
import { Box, Grid, useTheme } from '@mui/material';
import { AcUnit, Class, Star } from '@mui/icons-material';
import { InviteUserButton } from '../../InviteUsers';
import { TableWithoutPagination } from '@ek-components/Table';
import { StartEndBatch } from './StartEndBatch';
import { BatchSessions } from './BatchSessions';
import {
  ApiResponse,
  ICourseBatch,
  PaginatedResult,
  TeacherCourseBatchResponse,
} from '@ek-types';
import { CourseProgress } from '../Courses/courseProgress';
import StatSection from '@/app/features/teachers/Batches/StatSection';
import { useFetchTeacherCourseBatchQuery } from '@/redux/slices/teacher/teacherCourseBatchApi';
import { formatDate } from '@/utils/dateUtils';

interface BatchSummaryProps {
  batch?: any;
  data: TeacherCourseBatchResponse;
}

export const BatchSummary = ({ data }: BatchSummaryProps) => {
  const [batchData, setBatchData] = useState<TeacherCourseBatchResponse>(data);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const theme = useTheme();
  const {
    data: fetchedData,
    refetch,
    isFetching,
  } = useFetchTeacherCourseBatchQuery(
    {
      params: { batchId: String(data?.batch?._id) },
    },
    { skip: !shouldRefetch }
  );

  useEffect(() => {
    if (shouldRefetch) {
      refetch().then((result) => {
        if (result.data) {
          setBatchData(result.data.data as TeacherCourseBatchResponse);
          setShouldRefetch(false);
        }
      });
    }
  }, [shouldRefetch, refetch]);

  const handleSessionEnded = useCallback(async () => {
    setShouldRefetch(true);
  }, []);

  const { batch, members, pendingInvites } = batchData;

  const getParticipantsData = useCallback(async (): Promise<any[]> => {
    return members.data?.map((member) => {
      return member.user;
    });
  }, [members]);

  // console.log(getParticipantsData);
  return (
    <Box
      display='flex'
      flexDirection='column'
      p={isMobile ? 2 : 3}
      sx={{ gap: isMobile ? '1rem' : '2rem' }}
    >
      <Box
        sx={{
          p: isMobile ? 2 : 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.grey[600],
          position: 'relative',
        }}
      >
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} md={8}>
            <TitleMain variant='h6'>
              <strong>Course Name : </strong>
              {batch?.course?.title || 'N/A'}{' '}
            </TitleMain>
            <TitleSubMain variant='body1'>
              <strong> Batch Name : </strong>
              {batch?.name || 'N/A'}{' '}
            </TitleSubMain>
            <TitleSubMain variant='body1'>
              <strong> Status : </strong>
              {batch?.status || 'N/A'}{' '}
            </TitleSubMain>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
            >
              <InviteUserButton batch={batch}>Invite Student</InviteUserButton>
              <StartEndBatch batch={batch} />
            </Grid>
          )}
        </Grid>
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              mt: 2,
            }}
          >
            <InviteUserButton batch={batch}>Invite Student</InviteUserButton>
            <StartEndBatch batch={batch} />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '10px' : '0',
          }}
        >
          <StatSection batch={batch} />
        </Box>
      </Box>

      <Box sx={{ margin: '10px' }}>
        <Grid container spacing={7}>
          <Grid item xs={12} md={6}>
            <BatchSessions batch={batch} onSessionEnded={handleSessionEnded} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CourseProgress batchData={batch} />
          </Grid>
        </Grid>
        <Grid container spacing={7}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            ></Box>
            <TitleSubSection>Participants</TitleSubSection>
            <TableWithoutPagination
              columns={[
                { field: 'name', headerName: 'Student Name' },
                { field: 'grades', headerName: 'Grades' },
                { field: 'email', headerName: 'Email' },
                {
                  field: '',
                  headerName: 'Score',
                  customField: (row: any) => {
                    return 'NA';
                  },
                },
              ]}
              getDataFn={getParticipantsData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BatchSessions batch={batch} onSessionEnded={handleSessionEnded} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CourseProgress batchData={batch} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
