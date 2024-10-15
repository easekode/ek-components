import { Box } from '@mui/material';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Box>
        <Box>Header</Box>
        {children}
      </Box>
    </body>
  );
};
