import * as React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { theme } from '..';

interface ActionMessageProps extends TypographyProps {
  message?: string;
}

export const ActionMessage = (props: ActionMessageProps) => {
  const { message, ...rest } = props;
  return (
    <Typography
      variant='body1'
      color={`${theme.palette.success.main}`}
      sx={{ fontSize: '0.8rem', mt: 1, textAlign: 'center' }}
      {...rest}
    >
      {message}
    </Typography>
  );
};
