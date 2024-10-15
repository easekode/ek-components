import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface LogoProps extends BoxProps {
  src: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  src,
  width = 100,
  height = 100,
  ...props
}) => {
  return (
    <Box {...props}>
      <Image src={src} alt='Logo' width={width} height={height} />
    </Box>
  );
};
