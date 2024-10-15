import {
  BoxContainer,
  Button,
  TextArea,
  TitleSubSection,
} from '@ek-components';
import { Typography } from '@mui/material';
import Ratings from '../../Ratings/index';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { displayFlexRow } from '@/utils/styles';

interface FeedbackProps {
  topics: { topic: string }[];
}

export const FeedbackForm: React.FC<FeedbackProps> = ({ topics }) => {
  return (
    <form onSubmit={() => {}} style={{ margin: '10px' }}>
      <BoxContainer
        additionalStyles={{
          alignItems: 'center',
        }}
      >
        <TitleSubSection variant='h4'>Student Feedback Form</TitleSubSection>
      </BoxContainer>

      <BoxContainer>
        {topics.map((feedback, index) => (
          <Typography
            key={index}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            {feedback.topic} <Ratings />
          </Typography>
        ))}
        <FormControl variant='outlined'>
          <Typography>
            Are you satisfied with the instructor?
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel value='yes' control={<Radio />} label='Yes' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </Typography>
        </FormControl>
        Tell us what can be improved
        <TextArea minRows={4}></TextArea>
        <BoxContainer sx={{ ...displayFlexRow, justifyContent: 'flex-end' }}>
          <Button>Submit</Button>
        </BoxContainer>
      </BoxContainer>
    </form>
  );
};
