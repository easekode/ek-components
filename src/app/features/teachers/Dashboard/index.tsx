/*

Data to be shown on the dashboard of a teacher
Total Courses
Total Completed Batches
Total Students
Total Hours
Total Earnings
Total Ratings

Recent batches
Sessions students
Activitites of students
*/

import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  Stat,
  DatePickerButton,
  BoxContainer,
  useIsMobile,
} from '@ek-components';
import { CardMembership, VerifiedUser, Star } from '@mui/icons-material';
import { RecentlyJoinedStudents } from './RecentlyJoinedStudents';
import { RecentBatches } from './RecentBatches';
import { LiveUpdates } from './LiveUpdates';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
// import { DatePicker } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import { getApi } from '@/utils';
import { ApiUrl } from '@/config/api';
import { ICourseBatch, TeacherDashboardResponse } from '@ek-types';
import { AppRoutes } from '@/config/appRoutes';

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    data: result,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exam'],
    queryFn: () =>
      getApi<TeacherDashboardResponse>({
        url: ApiUrl.TEACHER_INFO_DASHBOARD,
      }),
  });
  const data = result?.data;

  const totalCourses = data?.totalCourses; // replace with actual value
  const totalBatches = data?.totalBatches; // replace with actual value
  const totalStudents = data?.totalStudents; // replace with actual value
  const totalSessions = data?.totalSessions; // replace with actual value
  const totalEarnings = data?.totalEarnings; // replace with actual value
  const totalRatings = data?.totalRatings; // replace with actual value

  const allStats = [
    {
      title: 'Total Courses',
      value: totalCourses?.toString(),
      icon: <CardMembership />,
      href: '/teacher/courses',
    },
    {
      title: 'Total Batches',
      value: totalBatches?.toString(),
      icon: <Star />,
      href: AppRoutes.TEACHER_BATCHES,
    },
    {
      title: 'Total Students',
      value: totalStudents?.toString(),
      icon: <VerifiedUser />,
      href: AppRoutes.TEACHER_TOTAL_STUDENTS,
    },
    {
      title: 'Total Sessions',
      value: totalSessions?.toString(),
      icon: <CardMembership />,
      href: AppRoutes.TEACHER_SESSION,
    },
    {
      title: 'Total Earnings',
      value: totalEarnings?.toString(),
      icon: <CardMembership />,
      href: '',
    },
    {
      title: 'Total Ratings',
      value: totalRatings?.toString(),
      icon: <CardMembership />,
      href: '',
    },
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Box>
      <Grid
        container
        spacing={4}
        sx={{
          width: `${isMobile ? '100%' : '60vw'}`,
          margin: 'auto',
        }}
      >
        {allStats.map((stat, key) => (
          <Grid key={key} item xs={6} sm={6} md={4}>
            <Stat
              icon={stat.icon}
              title={stat.title}
              value={`${stat.value}`}
              href={stat.href}
            />
          </Grid>
        ))}
      </Grid>

      <BoxContainer
        additionalStyles={{
          display: 'flex',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          width: '100%',
          border: '1px solid #e0e0e0',
          justifyContent: 'space-evenly',
          flexWrap: `${isMobile ? 'nowrap' : 'wrap'}`,
        }}
      >
        <RecentlyJoinedStudents data={data?.recentlyJoinedStudents as any[]} />
        <RecentBatches data={data?.recentBatches as ICourseBatch[]} />
        <LiveUpdates />
      </BoxContainer>
    </Box>
  );
};

export default Dashboard;
