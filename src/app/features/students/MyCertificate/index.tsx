import { theme } from '@ek-components';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const CertificateCard = ({ cert }) => (
  <Grid item xs={12} md={5}>
    <Card sx={{ marginRight: '20px' }}>
      <CardContent
        sx={{
          backgroundColor: theme.palette.grey[200],
          borderRadius: '5px',
        }}
      >
        <Typography variant='body1' sx={{ color: theme.palette.grey[600] }}>
          <strong>{cert.title}</strong>
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.grey[600] }}>
          {cert.description}
        </Typography>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            style={{
              width: '100%',
              maxWidth: 300,
              border: `3px solid ${theme.palette.grey[600]}`,
            }}
          />
        </Box>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            gap: '2',
          }}
        >
          <Button
            variant='outlined'
            // onClick={() => window.open(cert.downloadLink)}
          >
            <DownloadIcon sx={{ mr: 1 }} />
            Download
          </Button>
          <Button
            variant='outlined'
            sx={{ ml: 1 }}
            // onClick={() => window.open(cert.shareLink)}
          >
            <ShareIcon sx={{ mr: 1 }} />
            Share
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

const MyCertificate = ({ certificates }) => {
  const handleSeeAllCertificates = () => {
    //  router.push(AppRoutes.MY_CERTIFICATE)
  };

  return (
    <Box mt={10}>
      <Card>
        <CardContent>
          <Box sx={{ position: 'relative' }}>
            <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
              <strong>My Certificates</strong>
            </Typography>
            <Link
              onClick={handleSeeAllCertificates}
              sx={{
                position: 'absolute',
                top: 8,
                right: 10,
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <strong>See all</strong>
            </Link>
            <Grid container spacing={2} mt={2}>
              {certificates.map((cert, index) => (
                <CertificateCard key={index} cert={cert} />
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyCertificate;
