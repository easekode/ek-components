import { FormFieldLabels } from '@/constants';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

import { DurationUnit as DurationUnitEnum } from '@ek-types';

export const DurationUnit = (props: SelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>
        {FormFieldLabels.DURATION_UNIT}
      </InputLabel>
      <Select
        label={FormFieldLabels.DURATION_UNIT}
        placeholder={FormFieldLabels.DURATION_UNIT}
        name='durationUnit'
        value={props.value}
        {...props}
      >
        {Object.values(DurationUnitEnum).map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
