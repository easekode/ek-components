import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { theme, TitleSubSection } from '@ek-components';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadImage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/svg+xml': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: `2px dashed ${theme.palette.grey[300]}`,
        padding: '1rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        backgroundColor: `${theme.palette.grey[400]}`,
      }}
    >
      <input {...getInputProps()} />
      <TitleSubSection variant='body1' gutterBottom>
        Drag and drop JPEG, JPG, PNG, or SVG files here or click to browse.
      </TitleSubSection>
      <Button variant='contained' color='primary'>
        Browse Files
      </Button>
      {uploadedFiles.length > 0 && (
        <List
          sx={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            width: '20%',
            margin: 'auto',
          }}
        >
          {uploadedFiles.map((file) => (
            <ListItem
              key={file.name}
              sx={{
                justifyContent: 'space-between',
              }}
            >
              <Typography>{file.name}</Typography>
              <IconButton
                onClick={() => handleRemoveFile(file.name)}
                color='secondary'
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UploadImage;
