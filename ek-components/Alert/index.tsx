import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from './AlertContext';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

export const AlertComponent = () => {
  const { alert, showAlert } = useContext(AlertContext);
  const [open, setOpen] = useState<boolean>(alert !== null);
  useEffect(() => {
    setOpen(alert !== null);
  }, [alert]);
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => {
        showAlert && showAlert(null);
      }}
      action={
        <>
          <IconButton
            aria-label='close'
            color='inherit'
            sx={{ p: 0.5 }}
            onClick={() => {
              showAlert && showAlert(null);
            }}
          >
            <Close />
          </IconButton>
        </>
      }
      message={alert?.message}
    >
      <Alert
        variant='filled'
        severity={alert?.type === 'error' ? 'error' : 'success'}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
