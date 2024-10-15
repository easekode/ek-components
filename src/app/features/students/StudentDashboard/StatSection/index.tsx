import { Stat } from '@ek-components/Stat';
import { AcUnit, Class, Star } from '@mui/icons-material';
import { Box } from '@mui/material';
import { myScore } from '..';

export const StatSection = ({
  studentDashboardData,
}: {
  studentDashboardData: any;
}) => {
  const stats = [
    {
      icon: <AcUnit />,
      title: 'Total Score',
      value: myScore || '0',
    },
    {
      icon: <Star />,
      title: 'Total Session',
      value: studentDashboardData?.sessions.length || '0',
    },
    {
      icon: <Class />,
      title: 'Total Attendance',
      value: `${studentDashboardData?.attendance?.present || 0}/${
        studentDashboardData?.attendance?.absent || 0
      }`,
    },
  ];

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', gap: 4 }}>
        {stats.map((stat, index) => (
          <Stat
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </Box>
    </Box>
  );
};
