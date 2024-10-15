import { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Fade } from '@mui/material';
import { displayFlexRow } from '@/utils';

export const AddNewIcon = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box
      sx={{
        ...displayFlexRow,
        // border: '1px solid red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      {!open && <AddCircleOutline onClick={() => setOpen(!open)} />}

      {open && (
        <Fade in={open}>
          <Box>{children}</Box>
        </Fade>
      )}
    </Box>
  );
};
