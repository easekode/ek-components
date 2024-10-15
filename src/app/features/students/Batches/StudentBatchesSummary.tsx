'use client';

import { useCallback } from 'react';
import { Grid } from '@mui/material';
import {
  BoxContainer,
  Stat,
  useIsMobile,
  theme,
  TitleSubSection,
  CustomAvatar,
} from '@ek-components';
import { AcUnit, Class, Star } from '@mui/icons-material';
import { TableWithoutPagination } from '@ek-components/Table';
import { StudentBatchSessions } from './StudentBatchesDetails';
import { CourseProgress } from '../../teachers/Courses/courseProgress';

const StatSection = ({ batch }) => {
  return (
    <BoxContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BoxContainer sx={{ display: 'flex', gap: 4 }}>
        <Stat
          icon={<Star />}
          title='Completed Chapters'
          value={batch?.stats?.completedChapters?.toString() || '0'}
          href={'href'}
        />
        <Stat
          icon={<AcUnit />}
          title='Total Chapters'
          value={batch?.stats?.totalChapters?.toString() || '0'}
        />
        <Stat
          icon={<Class />}
          title='Total Sessions'
          value={batch?.stats?.totalSessions?.toString() || '0'}
          href={'href'}
        />
      </BoxContainer>
    </BoxContainer>
  );
};

export const StudentBatchesSummary = ({ data }) => {
  const { batch, sessions, members } = data;

  const isMobile = useIsMobile();

  const getParticipantsData = useCallback(async (): Promise<any[]> => {
    return members.data?.map((member: any) => {
      return member.user;
    });
  }, [members]);

  return (
    <BoxContainer
      display='flex'
      flexDirection='column'
      p={isMobile ? 2 : 3}
      sx={{ gap: isMobile ? '1rem' : '2rem' }}
    >
      <BoxContainer
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
            <TitleSubSection variant='h6'>
              <strong>Course Name : </strong>
              {batch?.course?.title || 'N/A'}{' '}
            </TitleSubSection>
            <TitleSubSection variant='body1'>
              <strong> Batch Name : </strong>
              {batch?.name || 'N/A'}{' '}
            </TitleSubSection>
            <TitleSubSection variant='body1'>
              <strong> Status : </strong>
              {batch?.status || 'N/A'}{' '}
            </TitleSubSection>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
            ></Grid>
          )}
        </Grid>
        {isMobile && (
          <BoxContainer
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              mt: 2,
            }}
          ></BoxContainer>
        )}
        <BoxContainer
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
        </BoxContainer>
      </BoxContainer>
      <Grid item xs={12}>
        <StudentBatchSessions data={data} />
      </Grid>

      <Grid container spacing={7}>
        <Grid item xs={12} md={6}>
          <BoxContainer
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <TitleSubSection>Participants</TitleSubSection>
          </BoxContainer>
          <TableWithoutPagination
            columns={[
              {
                field: 'name',
                headerName: 'Student Name',
                customField: (row: any) => (
                  <BoxContainer
                    sx={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <CustomAvatar
                      name={row.name}
                      profilePicture={row.profilePicture}
                    />
                    <TitleSubSection variant='body1'>
                      {row.name}
                    </TitleSubSection>
                  </BoxContainer>
                ),
              },
              { field: 'email', headerName: 'Email' },
            ]}
            getDataFn={getParticipantsData}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CourseProgress batchData={batch} />
        </Grid>
      </Grid>
    </BoxContainer>
  );
};
