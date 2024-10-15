import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { Level } from '@ek-types';

export function LevelChoose(props: SelectProps<Level>) {
  return (
    <FormControl fullWidth>
      <InputLabel id='label-question-complexity-choose'>
        {props.label || 'Complexity'}
      </InputLabel>
      <Select
        labelId='label-question-complexity-choose'
        id='demo-simple-select'
        label={'Complexity'}
        {...props}
      >
        {Object.values(Level).map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
