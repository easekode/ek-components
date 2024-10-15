import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TextField } from '.';

export const TextArea = (props: TextFieldProps) => {
  return <TextField multiline fullWidth {...props} />;
};
