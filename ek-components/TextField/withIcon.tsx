import React from 'react';
import { TextFieldProps, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField } from './index';

export const WithIcon = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      variant='outlined'
      type={showPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            edge='end'
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
      {...props}
    />
  );
};
