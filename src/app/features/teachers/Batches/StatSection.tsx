import { Box } from '@mui/material';
import { AcUnit, Class, Star } from '@mui/icons-material';
import { Stat } from '@ek-components';
import { ICourseBatch } from '@ek-types';

interface StatSectionProps {
  batch: ICourseBatch;
}

const StatSection = ({ batch }: StatSectionProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Stat
          icon={<AcUnit />}
          title='Topics Covered'
          value={batch?.stats?.totalChapters?.toString() || '0'}
          href={''}
        />
        <Stat
          icon={<Star />}
          title='Total Ratings'
          value={batch?.stats?.ratings?.toString() || '0'}
          href={'href'}
        />
        <Stat
          icon={<Class />}
          title='Completed Sessions'
          value={batch?.stats?.completedSessions?.toString() || '0'}
          href={'href'}
        />
      </Box>
    </Box>
  );
};

export default StatSection;
