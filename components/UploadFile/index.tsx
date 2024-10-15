import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { theme } from '@ek-components/index';
import { useState } from 'react';

export const UploadFile = ({ uploadedFile, setUploadedFile, buttonText }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleUploadFile = () => setUploadDialogOpen(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0] || null;
    if (file) {
      setUploadedFile(file);
      setUploadDialogOpen(false);
    }
  };

  const handleFileDelete = () => setUploadedFile(null);

  return (
    <Box>
      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Button variant='contained' color='primary' onClick={handleUploadFile}>
          <Box component='span' sx={{ display: 'flex', alignItems: 'center' }}>
            <Upload sx={{ mr: 1 }} /> {buttonText}
          </Box>
        </Button>
      </Box>
      {uploadedFile && (
        <Box mt={10}>
          <Card>
            <CardContent>
              <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
                <strong>My File</strong>
              </Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ marginRight: '20px' }}>
                    <CardContent>
                      <Typography
                        variant='body1'
                        sx={{ color: theme.palette.grey[600] }}
                      >
                        <strong>{uploadedFile.name}</strong>
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
                        <Typography
                          variant='body2'
                          sx={{ color: theme.palette.grey[600] }}
                        >
                          File Type: {uploadedFile.type}
                        </Typography>
                      </Box>
                      <Box
                        mt={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          gap: '2',
                        }}
                      >
                        <Button variant='outlined'>View</Button>
                        <Button variant='contained'>Download</Button>
                        <Button
                          variant='text'
                          color='secondary'
                          onClick={handleFileDelete}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <TextField type='file' fullWidth onChange={handleFileUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleFileUpload} variant='contained'>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
