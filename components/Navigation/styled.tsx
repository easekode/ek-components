import { Box, styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
// import {Space}
export const SearchIconContainer = styled(Box)(({ theme }) => ({
  // padding: theme.spacing(Spacing.NO, Spacing.MD),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const StyledItemWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  // gap: theme.spacing(Spacing.XS1),
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  width: '100%',
  // background: theme.palette.common.white,
  border: `1px solid ${theme.palette.text.primary}`,
  /* padding: theme.spacing(Spacing.XS3),
  borderRadius: theme.spacing(Spacing.XS3), */
}));

export const StyledDesktopWrapper = styled(Box)(() => ({
  flexGrow: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
}));
