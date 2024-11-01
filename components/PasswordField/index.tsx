import * as React from 'react';
import { useState } from 'react';
import {
  IconButton,
  TextField,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordField = ({
  label = 'Enter your password',
  name,
  value,
  onChange,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      label={label}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      fullWidth
      autoComplete='new-password'
      sx={{
        marginTop: '20px',
        border: 'none',
        '& .MuiInputBase-input': {
          height: '0.2rem',
        },
        '& .MuiFormLabel-root': {
          lineHeight: '0.6rem',
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
