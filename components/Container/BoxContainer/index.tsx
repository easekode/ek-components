import { BoxProps, Box } from '@mui/material';
import { displayFlexColumn } from '@ek-components/utils';

interface ContainerProps extends BoxProps {
  additionalStyles?: any;
}
export const BoxContainer = ({
  children,
  additionalStyles = {},
  ...props
}: ContainerProps) => {
  return (
    <Box
      sx={{
        ...displayFlexColumn,
        ...additionalStyles,
        gap: '10px',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
