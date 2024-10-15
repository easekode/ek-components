import { BoxContainer, Stat } from '@ek-components';
import StarIcon from '@mui/icons-material/Star';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { StudentList } from './StudentList';
import { Box } from '@mui/material';

export const BatchDashBoard = () => {
  return (
    <Box>
      <BoxContainer sx={{ display: 'flex' }}>
        <Stat icon={<StarIcon />} title='Total Ratings' value='4.5' />
        <Stat icon={<RotateRightIcon />} title='Topics Covered' value='5/10' />
        <Stat
          title='Total Sessions'
          icon={<EditCalendarIcon />}
          value='10/20'
        />
      </BoxContainer>

      <BoxContainer>
        <StudentList />
      </BoxContainer>
    </Box>
  );
};
