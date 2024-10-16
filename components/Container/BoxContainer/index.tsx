import { BoxProps, Box } from '@mui/material';
import { displayFlexColumn } from '@ek-components/utils';

interface ContainerProps extends BoxProps {
  additionalStyles?: any;
  component?: React.ElementType;
}
export const BoxContainer = ({
  children,
  additionalStyles = {},
  component = 'div',
  ...props
}: ContainerProps) => {
  return (
    <Box
      component={component}
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
