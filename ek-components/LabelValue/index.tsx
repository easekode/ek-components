import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';

export const LabelValue = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant='h6'>{value}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
