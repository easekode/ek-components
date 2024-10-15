import { BoxContainer } from '@ek-components';
import {
  Dialog,
  Backdrop,
  IconButton,
  DialogContent,
  Typography,
  DialogTitle,
  Box,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, useIsMobile } from '@/../ek-components/index';
import { ModalContext } from '@/../ek-components/Modal/ModalContext/index';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import {
  StyledButton,
  StyledCopiedText,
  StyledCopiedWrapper,
  StyledCopyLinkButton,
  StyledCopyLinkWrapper,
  StyledShareTypography,
  StyledWrapper,
} from './styled';
import { isMobile } from 'survey-core/typings/utils/utils';
import { displayFlexColumn } from '@/utils/styles';

export interface ShareModalProps {
  url: string;
}

const ShareModal = ({ url }: ShareModalProps) => {
  const isMobile = useIsMobile();
  const { setIsOpen } = useContext(ModalContext);

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  };
  return (
    <>
      <BoxContainer sx={{ p: 12, marginY: 'auto' }}>
        <Typography variant='body1' id='customized-dialog-title'>
          Shareable link
        </Typography>

        <StyledCopiedWrapper>
          {copied && (
            <StyledCopiedText sx={{ width: isMobile ? '30%' : '12%' }}>
              <DoneIcon fontSize='small' />
              Copied!
            </StyledCopiedText>
          )}
        </StyledCopiedWrapper>

        <StyledCopyLinkWrapper
          sx={{
            flexDirection: isMobile ? 'column' : 'row',
            gap: '10px',
          }}
        >
          <TextField
            label='Link'
            value={url}
            sx={{ width: isMobile ? '100%' : '70%' }}
          />
          <Button
            // fullWidth
            onClick={() => {
              handleCopy();
            }}
            startIcon={<ContentCopyIcon />}
            sx={{ width: isMobile ? '100%' : '30%', padding: '16px' }}
          >
            Copy link
          </Button>
        </StyledCopyLinkWrapper>
      </BoxContainer>
    </>
  );
};

export const ShareComponent = ({ url }: { url: string }) => {
  const isMobile = useIsMobile();
  const {
    setIsOpen,
    setDialogProps,
    isOpen: isOpenContext,
    dialogProps,
    setModalContent,
  } = useContext(ModalContext);

  const [isOpen, setIsOpenState] = useState(isOpenContext || false);
  useEffect(() => {
    setIsOpenState(isOpenContext || false);
  }, [isOpenContext]);
  return (
    <Button
      onClick={() => {
        setModalContent && setModalContent(<ShareModal url={url} />);
        setDialogProps &&
          setDialogProps({
            maxWidth: 'md',

            closeAfterTransition: true,
            slots: { backdrop: Backdrop },
            slotProps: {
              backdrop: {
                timeout: 500,
              },
            },
          });

        setIsOpen && setIsOpen(true);
      }}
    >
      Share
    </Button>
  );
};
