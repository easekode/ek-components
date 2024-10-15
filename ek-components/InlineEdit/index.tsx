import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import {
  CheckOutlined,
  DeleteForeverOutlined,
  ModeEditOutlined,
} from '@mui/icons-material';
import { theme } from '@ek-components/theme';

export type InlineEditProps = TextFieldProps & {
  value: any;
  onEdit?: (value: string) => void;
  onDelete?: (value: any) => void;
  loading?: boolean;
  styleModeEdit?: object;
};

export const InlineEdit = (props: InlineEditProps) => {
  const { styleModeEdit, ...restProps } = props;
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.value as string);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
    restProps.onChange?.(event);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {editMode && (
        <TextField
          fullWidth
          {...restProps}
          inputRef={inputRef}
          value={value}
          onChange={handleChange}
        />
      )}
      {!editMode && <Typography>{props.value as string}</Typography>}
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'right',
          justifyContent: 'center',
        }}
      >
        {!editMode && (
          <ModeEditOutlined
            sx={styleModeEdit}
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(true);
            }}
          />
        )}
        {editMode && (
          <CheckOutlined
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(false);
              restProps.onEdit?.(value);
            }}
          />
        )}
        {editMode && (
          <DeleteForeverOutlined
            onClick={() => {
              setEditMode(false);
              restProps.onDelete?.(value);
            }}
            sx={{ color: theme.palette.grey[900] }}
          />
        )}
      </Box>
    </Box>
  );
};
