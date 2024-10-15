import { Box } from '@mui/material';

export const DividerWithText: React.FC = () => {
  return (
    <Box display='flex' alignItems='center' my={2}>
      <Box flexGrow={1}>
        <hr />
      </Box>
      <Box mx={2} sx={{ fontSize: '0.8rem' }}>
        Or
      </Box>
      <Box flexGrow={1}>
        <hr />
      </Box>
    </Box>
  );
};
