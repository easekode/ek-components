import { ModalContext } from '@ek-components/Modal/ModalContext';
import { useContext } from 'react';

export const useModalManager = () => {
  const modalContext = useContext(ModalContext);
  const { setIsOpen, setModalContent } = modalContext || {};

  const openModal = (content: React.ReactNode) => {
    if (setModalContent && setIsOpen) {
      setModalContent(content as any);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return { openModal, closeModal };
};
