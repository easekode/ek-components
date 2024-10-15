import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface SearchBarProps extends Omit<TextFieldProps, 'onChange'> {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  ...props
}) => {
  return (
    <TextField
      label='Search Users'
      variant='outlined'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      fullWidth
      {...props}
    />
  );
};
