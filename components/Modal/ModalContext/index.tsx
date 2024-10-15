import { createContext, ReactNode, useReducer } from 'react';
import { DialogProps } from '@mui/material';

type ModalContentType = React.ReactElement;

export interface ModalContextInterface {
  modalContent?: ModalContentType;
  setModalContent: (modalContent?: ModalContentType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dialogProps?: NewDialogueProps;
  setDialogProps: (dialogProps: NewDialogueProps) => void;
}

interface NewDialogueProps extends Omit<DialogProps, 'open'> {}

type ModalAction =
  | { type: 'SET_MODAL_CONTENT'; payload?: ModalContentType }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'SET_DIALOG_PROPS'; payload: NewDialogueProps };

const initialState: Omit<
  ModalContextInterface,
  'setModalContent' | 'setIsOpen' | 'setDialogProps'
> = {
  modalContent: undefined,
  isOpen: false,
  dialogProps: undefined,
};

function modalReducer(state: typeof initialState, action: ModalAction) {
  switch (action.type) {
    case 'SET_MODAL_CONTENT':
      return { ...state, modalContent: action.payload };
    case 'SET_IS_OPEN':
      return { ...state, isOpen: action.payload };
    case 'SET_DIALOG_PROPS':
      return { ...state, dialogProps: action.payload };
    default:
      return state;
  }
}

export const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const setModalContent = (modalContent?: ModalContentType) =>
    dispatch({ type: 'SET_MODAL_CONTENT', payload: modalContent });
  const setIsOpen = (isOpen: boolean) =>
    dispatch({ type: 'SET_IS_OPEN', payload: isOpen });
  const setDialogProps = (dialogProps: NewDialogueProps) =>
    dispatch({ type: 'SET_DIALOG_PROPS', payload: dialogProps });

  return (
    <ModalContext.Provider
      value={{
        ...state,
        setModalContent,
        setIsOpen,
        setDialogProps,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
