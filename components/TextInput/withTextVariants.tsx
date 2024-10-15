import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { TextVariants } from './textVariants';

export const withTextVariants = (variant: TextVariants) => {
    // eslint-disable-next-line react/display-name
    return (props: TextFieldProps) => <TextField size='small' variant={variant} {...props} />
}
