import {
  ErrorDisplay,
  TitleSubSection,
  useIsMobile,
  Loading,
} from '@ek-components';
import { Box, Grid, Paper, useTheme } from '@mui/material';
import { Assessments } from './Assessment';
import { ProfileDetails } from './ProfileDetails';
import { StatSection } from './StatSection';
import { SessionsTable } from './Session';
import { useQuery } from '@tanstack/react-query';
import { StudentDashboardResponse } from '@ek-types';
import { getApi } from '@/utils';
import { ApiUrl } from '@/config/api';
import { LeaderBoard } from './LeaderBoard';
import { ScoreTimelineChart } from './ScoreTimeline';
import { getLocalUserInfo } from '@ek-components/Auth/authToken';
import { StudentBatchList } from '../Batches/StudentBatchList';

export let myScore: number | undefined;

export const StudentDashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['studentDashboard'],
    queryFn: () =>
      getApi<StudentDashboardResponse>({
        url: ApiUrl.STUDENT_INFO_DASHBOARD,
      }),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.data) {
    return (
      <ErrorDisplay message={error ? error.message : 'Failed to load data'} />
    );
  }

  const studentDashboardData = data.data;
  const loginUserInfo = getLocalUserInfo();

  myScore = studentDashboardData.score;

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ gap: '1rem', p: isMobile ? 2 : 4 }}
    >
      <Box
        sx={{
          p: isMobile ? 2 : 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.grey[600],
        }}
      >
        <ProfileDetails loginUserInfo={loginUserInfo} isMobile={isMobile} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: isMobile ? 2 : -2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}
        >
          <StatSection studentDashboardData={studentDashboardData} />
        </Box>
      </Box>
      <Box>
        <TitleSubSection>Student Batches</TitleSubSection>
        <StudentBatchList />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TitleSubSection>Score Timeline Chart</TitleSubSection>
            <Paper sx={{ p: isMobile ? 2 : 5 }}>
              <ScoreTimelineChart
                scoreTimeline={studentDashboardData?.scoreTimeline}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <TitleSubSection>Leader Board</TitleSubSection>
            <LeaderBoard
              leaderBoardData={studentDashboardData?.leaderboard || []}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ margin: '10px' }}>
        <Grid container spacing={7}>
          <SessionsTable studentDashboardData={studentDashboardData} />
          <Assessments studentDashboardData={studentDashboardData} />
        </Grid>
      </Box>
    </Box>
  );
};
