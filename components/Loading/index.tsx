import { theme } from '@ek-components/theme/index';
import { Box, CircularProgress, Typography } from '@mui/material';
interface LoadingProps {
  height?: string;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  height = '100vh',
  message = 'Loading, please wait...',
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height={height}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <CircularProgress color='secondary' />
      <Typography variant='h5' sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};
