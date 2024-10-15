import { BoxContainer } from '@/../ek-components/Container/BoxContainer/index';
import { Button } from '@/../ek-components/index';
import { Typography } from '@mui/material';
import { displayFlexColumn, displayFlexRow } from '@/utils';
import { styled } from '@mui/material';

export const StyledShareTypography = styled(Typography)(({}) => {
  return {
    pt: 4,
    fontWeight: 'bold',
  };
});

export const StyledWrapper = styled(BoxContainer)(({}) => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
  };
});

export const StyledCopiedWrapper = styled(BoxContainer)(({}) => {
  return {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    pb: 5,
  };
});

export const StyledCopiedText = styled(BoxContainer)(({}) => {
  return {
    background: 'green',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    // width: '10%',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: '6px',
    marginBottom: '10px',
  };
});

export const StyledCopyLinkWrapper = styled(BoxContainer)(({}) => {
  return {
    // ...displayFlexRow,
    justifyContent: 'space-between',
  };
});

export const StyledCopyLinkButton = styled(BoxContainer)(({}) => {
  return {
    // ...displayFlexColumn,
    justifyContent: 'center',
    width: '25%',
  };
});

export const StyledButton = styled(Button)(({}) => {
  return {
    width: '100%',
    padding: '16.5px 14px',
    justifyContent: 'space-evenly',
  };
});
