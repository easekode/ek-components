import { FormFieldLabels } from '@/constants';
import { TextField } from '@ek-components';
import { TextFieldProps } from '@mui/material';

export const CourseDuration = ({ onChange, ...props }: TextFieldProps) => (
  <TextField
    name='duration'
    value={props.value}
    onChange={(e) => {
      if (e.target.value.match(/^[0-9]*$/)) {
        onChange && onChange(e);
      }
    }}
    required
    label={FormFieldLabels.COURSE_DURATION}
    {...props}
  />
);
