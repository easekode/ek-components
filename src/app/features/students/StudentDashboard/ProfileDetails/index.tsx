import { CustomAvatar } from '@ek-components/CustomAvatar';
import { Box, Grid } from '@mui/material';
import { theme } from '@ek-components/theme';
import { LabelValue } from '@ek-components/LabelValue';
import { LoginResponse } from '@ek-types';

export const ProfileDetails = ({
  isMobile,
  loginUserInfo,
}: {
  isMobile: boolean;
  loginUserInfo: LoginResponse;
}) => {
  const profileData = loginUserInfo.profile;

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      sx={{ pt: isMobile ? 3 : 3, pl: isMobile ? 3 : 0 }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <CustomAvatar
          name={profileData?.name}
          profilePicture={profileData?.profilePicture}
          sx={{
            width: isMobile ? 100 : 150,
            height: isMobile ? 100 : 150,
            margin: 'auto',
            border: `5px solid ${theme.palette.secondary.light}`,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        sx={{ textAlign: isMobile ? 'center' : 'left' }}
      >
        <Box>
          <LabelValue label='Name:' value={profileData?.name} />
          <LabelValue
            label='Level:'
            value={profileData?.isAccountVerified || 'N/A'}
          />
          <LabelValue
            label='Joining Date:'
            value={profileData?.isProfileComplete || 'N/A'}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
