import React, { ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { destroyLocalUserInfo } from '@ek-components/Auth/authToken';
import { logout } from '@ek-components/redux/slices/auth/authSlice';
import { AppDispatch } from '@ek-components/redux/store';
import { AlertContext } from '@ek-components/Alert/AlertContext'; // Adjust this import to your alert library
import { Button } from '@ek-components/Button/index';
import { AppRoutes } from '@ek-components/config/appRoutes';
import { Message, MessageType } from '@ek-components/common';

interface LogoutButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  sx?: object;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  children,
  icon,
  buttonVariant = 'text',
  sx,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useContext(AlertContext);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear user data by destroying the cookie
    destroyLocalUserInfo();

    // Show alert or confirmation message
    showAlert({
      message: Message.LOGGED_OUT_SUCCESSFULLY,
      type: MessageType.SUCCESS,
    });

    // Redirect to login page
    router.push(AppRoutes.LOGIN);
  };

  return (
    <Button
      onClick={handleLogout}
      variant={buttonVariant}
      sx={sx}
      startIcon={icon || <LogoutIcon />}
    >
      {children || 'Logout'}
    </Button>
  );
};

export default LogoutButton;
