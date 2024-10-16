import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { displayFlexColumn } from '../utils/styles';
// import { displayFlexColumn } from '@ek-components/utils';

export const AddAttachment = () => {
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, e.target.files[0]]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const getPreview = (file: File) => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return (
          <Image
            width={0}
            height={0}
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        );
      case 'video':
        return (
          <video width={'100%'} src={URL.createObjectURL(file)} controls />
        );
      case 'audio':
        return (
          <audio
            style={{
              width: '100%',
              height: '100%',
            }}
            src={URL.createObjectURL(file)}
            controls
          />
        );
      case 'application':
        return (
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            src={URL.createObjectURL(file)}
            title={file.name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <input
        type='file'
        accept='image/*, video/*, audio/*, .pdf'
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id='file-input'
      />
      <label htmlFor='file-input'>
        <Button variant='contained' component='span'>
          Add Attachment
        </Button>
      </label>
      <Grid
        container
        spacing={'2px'}
        gap='10px'
        sx={{
          justifyContent: 'center',
        }}
      >
        {attachments.map((attachment, index) => (
          <Grid xs={6} md={2} item key={index}>
            <Box sx={{ border: '1px solid blue', ...displayFlexColumn }}>
              <Box
                sx={{
                  height: '100px',
                  width: '100%',
                }}
              >
                {getPreview(attachment)}
              </Box>
              <Typography
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '10px',
                }}
              >
                {attachment.name}
              </Typography>
              <Button onClick={() => handleRemoveAttachment(index)}>
                Remove
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
