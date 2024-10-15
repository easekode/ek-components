import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';
import { WithIcon } from './withIcon';

export const TextField = (props: TextFieldProps) => (
  <MuiTextField variant='outlined' {...props} />
);

export const TextFieldWithIcon = WithIcon;
