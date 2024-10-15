'use client';

import { LogInForm } from '@ek-components';

import { useAuthScreen } from '@/app/auth/AuthScreenContext';
import AuthScreen from '../auth/page';

const Login = () => {
  const { isAuthenticated } = useAuthScreen();
  return <>{isAuthenticated ? <AuthScreen /> : <LogInForm />}</>;
};

export default Login;
