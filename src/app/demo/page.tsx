import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
  BarChart as BarChartIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const StatsCard = () => {
  const { performance, averageGrade } = {
    performance: 90,
    averageGrade: 3.5,
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Card variant='outlined'>
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item>
                <BarChartIcon color='primary' />
              </Grid>
              <Grid item>
                <Typography variant='h5' component='div' color='text.primary'>
                  {performance}%
                </Typography>
                <Typography variant='body2' color='text.primary'>
                  Performance
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card variant='outlined'>
          <CardContent>
            <Grid container alignItems='center' spacing={2}>
              <Grid item>
                <SpeedIcon color='primary' />
              </Grid>
              <Grid item>
                <Typography variant='h5' component='div' color='text.primary'>
                  {averageGrade}
                </Typography>
                <Typography variant='body2' color='text.primary'>
                  Average Grade
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsCard;
