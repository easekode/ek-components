import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface HeadingProps extends TypographyProps {
  additionalStyles?: React.CSSProperties;
}

export const TitleHeader: React.FC<HeadingProps> = ({ title }) => {
  return <Typography variant='h5'>{title}</Typography>;
};

const EkTypography = ({
  children,
  additionalStyles = {},
  ...rest
}: HeadingProps) => {
  return (
    <Typography
      variant='h5'
      {...rest}
      sx={{
        ...additionalStyles,
      }}
    >
      {children}
    </Typography>
  );
};

export const TitleMain = ({ children, ...rest }: HeadingProps) => {
  return (
    <EkTypography variant='h1' {...rest}>
      {children}
    </EkTypography>
  );
};

export const TitleSubMain = ({ children, ...rest }: HeadingProps) => {
  return (
    <EkTypography variant='h2' {...rest}>
      {children}
    </EkTypography>
  );
};

export const TitleSection = ({ children, ...rest }: HeadingProps) => {
  return (
    <EkTypography variant='h4' {...rest}>
      {children}
    </EkTypography>
  );
};

export const TitleSubSection = ({ children, ...rest }: HeadingProps) => {
  return (
    <EkTypography variant='h5' {...rest}>
      {children}
    </EkTypography>
  );
};
