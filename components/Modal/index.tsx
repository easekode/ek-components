import React, { useContext } from 'react';
import { Dialog, Backdrop, IconButton } from '@mui/material';
import { useIsMobile } from '../hooks/useIsMobile';
import { Close } from '@mui/icons-material';
import { BoxContainer } from '../Container/BoxContainer/index';
import { ModalContext } from './ModalContext/index';

export const Modal = () => {
  const { isOpen, setIsOpen, modalContent, setModalContent, dialogProps } =
    useContext(ModalContext);
  const isMobile = useIsMobile();
  const handleClose = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isOpen === true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      fullScreen={isMobile}
      maxWidth='md'
      fullWidth={!isMobile}
      {...dialogProps}
    >
      <BoxContainer
        sx={{
          display: 'flex',
          // justifyContent: 'space-between',
          position: 'absolute',
          right: '10px',
          top: '10px',
          // border: '2px solid red',
          padding: 0,
        }}
      >
        <Close
          sx={{
            cursor: 'pointer',
            zIndex: 1000,
          }}
          onClick={() => {
            setModalContent && setModalContent(<></>);
            setIsOpen && setIsOpen(false);
          }}
        />
      </BoxContainer>
      {modalContent && (modalContent as React.ReactNode)}
    </Dialog>
  );
};
