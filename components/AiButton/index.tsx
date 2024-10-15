import React from 'react';
import { useTheme } from '@mui/material';
import { Button, EkButtonProps } from '../Button/index';
import { useIsMobile } from '../hooks/index';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export const AiButton = (props: EkButtonProps) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  return (
    <Button
      fullWidth={isMobile}
      sx={{
        // background: 'rgb(2,0,36)',
        background:
          'linear-gradient(circle, rgba(2,0,36,1) 0%, ' +
          theme.palette.primary.main +
          ' 0%, rgba(0,212,255,1) 100%);',

        '&:hover': {
          background: 'linear-gradient(45deg, #FF8E53 30%,#FE6B8B   90%)',
        },
      }}
      startIcon={<AutoAwesomeOutlinedIcon />}
      {...props}
    >
      {props?.children}
    </Button>
  );
};
