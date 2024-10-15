import { CustomAvatar, theme, TitleSubSection } from '@ek-components';
import { Box, Grid } from '@mui/material';
import { myScore } from '..';
import { Leaderboard } from '@ek-types';
import { getLocalUserInfo } from '@ek-components/Auth/authToken';

export const LeaderBoard = ({
  leaderBoardData,
}: {
  leaderBoardData: Leaderboard[];
}) => {
  const loginUserInfo = getLocalUserInfo();

  const sortedLeaderBoardData = [...leaderBoardData];
  sortedLeaderBoardData.sort((a, b) => b.score - a.score);

  const isProfileInLeaderboard = leaderBoardData.some(
    (student) =>
      student.user.email?.toString() === loginUserInfo?.profile?.email
  );

  const myRank = isProfileInLeaderboard
    ? leaderBoardData.findIndex(
        (student) =>
          student.user.email?.toString() ===
          loginUserInfo?.profile?.email.toString()
      ) + 1
    : leaderBoardData.length + 1;

  const topTenStudents = sortedLeaderBoardData.slice(0, 10);

  return (
    <Grid container spacing={1}>
      <Grid
        container
        alignItems='center'
        sx={{
          p: 8,
          mb: 2,
          backgroundColor: theme.palette.primary.light,
          borderRadius: '3px',
        }}
      >
        <Grid item xs={2} textAlign='center'>
          <TitleSubSection variant='body1' color='Background'>
            Rank
          </TitleSubSection>
        </Grid>
        <Grid item xs={7} textAlign='left' sx={{ ml: 10 }}>
          <TitleSubSection variant='body1' color='Background'>
            Name
          </TitleSubSection>
        </Grid>
        <Grid item xs={3} textAlign='center' sx={{ ml: -10 }}>
          <TitleSubSection variant='body1' color='Background'>
            Score
          </TitleSubSection>
        </Grid>
      </Grid>

      {topTenStudents.map((student, index) => {
        const isCurrentUser =
          student.user.email?.toString() === loginUserInfo?.profile?.email;
        return (
          <Grid
            container
            alignItems='center'
            sx={{
              p: 3,
              m: 1,
              backgroundColor: isCurrentUser
                ? theme.palette.warning.light
                : theme.palette.grey[300],
              borderRadius: '20px',
            }}
            key={student?.user?._id?.toString()}
          >
            <Grid item xs={2} textAlign='center'>
              <TitleSubSection variant='body1'>{index + 1}</TitleSubSection>
            </Grid>

            <Grid item xs={7} container alignItems='center'>
              <Box sx={{ mr: 10 }}>
                <CustomAvatar
                  name={student.user?.name?.toString() || 'Anonymous'}
                  profilePicture={
                    student.user?.profilePicture?.toString() || ''
                  }
                />
              </Box>
              <TitleSubSection
                variant='body1'
                sx={{
                  flexGrow: 1,
                }}
              >
                {student?.user?.name || student?.user?.email}
              </TitleSubSection>
            </Grid>
            <Grid item xs={3} textAlign='center'>
              <TitleSubSection variant='body1'>
                {student?.score}
              </TitleSubSection>
            </Grid>
          </Grid>
        );
      })}

      {!isProfileInLeaderboard && (
        <Grid
          container
          alignItems='center'
          sx={{
            p: 3,
            m: 1,
            borderRadius: '20px',
            backgroundColor: theme.palette.warning.light,
          }}
        >
          <Grid item xs={2} textAlign='center'>
            <TitleSubSection variant='body1'>{myRank}</TitleSubSection>
          </Grid>
          <Grid item xs={7} container alignItems='center'>
            <Box sx={{ mr: 10 }}>
              <CustomAvatar
                name={loginUserInfo?.profile?.name}
                profilePicture={loginUserInfo?.profile?.profilePicture || ''}
              />
            </Box>
            <TitleSubSection variant='body1' sx={{ flexGrow: 1 }}>
              {loginUserInfo?.profile?.name}
            </TitleSubSection>
          </Grid>
          <Grid item xs={3} textAlign='center'>
            <TitleSubSection variant='body1'>{myScore}</TitleSubSection>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
