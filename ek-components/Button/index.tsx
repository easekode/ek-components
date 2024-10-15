import { ButtonProps, Button as MuiButton } from '@mui/material';
import React from 'react';
import { useIsMobile } from '../index';

export interface EkButtonProps extends ButtonProps {
  loading?: boolean;
}

export const Button = (props: EkButtonProps) => {
  const isMobile = useIsMobile();

  if (props.loading) {
    return (
      <MuiButton {...props} disabled>
        Loading...
      </MuiButton>
    );
  }
  return (
    <MuiButton
      variant='contained'
      color='primary'
      {...props}
      fullWidth={isMobile}
    >
      {props.children}
    </MuiButton>
  );
};
