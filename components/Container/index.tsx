import * as React from 'react';
import { BoxProps, Box, SxProps } from '@mui/material';
import { displayFlexColumn } from '../utils/styles';
import { BoxContainer } from './BoxContainer/index';

interface FormContainerProps extends BoxProps {
  otherStyles?: any;
}

export const FormContainer = ({
  children,
  otherStyles = {},
  ...props
}: FormContainerProps) => {
  return (
    <BoxContainer
      sx={{
        ...displayFlexColumn,
        gap: '10px',
        padding: '10px',
        ...otherStyles,
      }}
      {...props}
    >
      {children}
    </BoxContainer>
  );
};
export * from './BoxContainer/index';
