import { Typography, TypographyProps } from '@mui/material';
import { theme } from '../index';
interface ErrorProps extends TypographyProps {
  message?: string;
}
export const ErrorDisplay = (props: ErrorProps) => {
  const { message, ...rest } = props;
  return (
    <Typography
      variant='body1'
      color={`${theme.palette.error.main}`}
      sx={{
        fontSize: '0.8rem',
        mt: 1,
        textAlign: 'left',
      }}
    >
      {message}
    </Typography>
  );
};
