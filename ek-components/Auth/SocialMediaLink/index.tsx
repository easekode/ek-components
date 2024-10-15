import { theme } from '@ek-components/theme';
import { FacebookOutlined, Google, LinkedIn } from '@mui/icons-material';
import { Box, Link } from '@mui/material';

export const SocialMediaLink: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Link href='#' sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `1px solid grey`,
          }}
        >
          <Google
            style={{
              color: theme.palette.primary.dark,
              fontSize: '2rem',
            }}
          />
        </Box>
      </Link>
      <Link href='#' sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `1px solid grey`,
          }}
        >
          <LinkedIn
            style={{
              color: theme.palette.primary.dark,
              fontSize: '2rem',
            }}
          />
        </Box>
      </Link>
      <Link href='#' sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `1px solid grey`,
          }}
        >
          <FacebookOutlined
            style={{
              color: theme.palette.primary.dark,
              fontSize: '2rem',
            }}
          />
        </Box>
      </Link>
    </Box>
  );
};
