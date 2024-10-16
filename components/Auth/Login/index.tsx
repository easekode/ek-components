import { useEffect, useState, useContext } from 'react';
import {
  Box,
  FormControlLabel,
  Link,
  Switch,
  Typography,
  Alert,
} from '@mui/material';
import {
  Button,
  DividerWithText,
  FormSubtitle,
  SocialMediaLink,
  useIsMobile,
} from '../../index';
import {
  TitleSubSection,
  BoxContainer,
  TextInput,
  theme,
  ErrorDisplay,
  PasswordField,
} from '@ek-components/index';
import { postApi, setCookie } from '@ek-components/utils';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@ek-components/config/appRoutes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  RoleDefinitionValue,
  roleDefinitions,
  LoginBody,
  LoginResponse,
} from '@ek-types';
import { FacebookOutlined, LinkedIn } from '@mui/icons-material';
import { login, logout } from '@ek-components/redux/slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@ek-components/redux/store';
import { setLocalUserInfo } from '../authToken';
import { AlertContext } from '@ek-components/Alert/AlertContext';

const getLandingPageByRole = (role: RoleDefinitionValue) => {
  if (role._id === roleDefinitions.role_admin._id) {
    return AppRoutes.ADMIN_DASHBOARD;
  }
  if (role._id === roleDefinitions.role_student._id) {
    return AppRoutes.STUDENT_DASHBOARD;
  }
  if (role._id === roleDefinitions.role_instructor._id) {
    return AppRoutes.TEACHER_DASHBOARD;
  }
  return AppRoutes.HOME;
};

export const LogInForm: React.FunctionComponent = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<LoginBody>();

  const isMobile = useIsMobile();
  const [apiError, setApiError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { showAlert } = useContext(AlertContext);
  const dispatch: AppDispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setValue('email', storedEmail);
      setValue('password', storedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleLoginResult = (payload: LoginResponse) => {
    const roles = payload?.profile?.roles;
    if (!roles) {
      setApiError('No roles found for the user.');
      return;
    }

    if (roles?.length === 0) {
      setApiError('No roles found for the user.');
      return;
    }

    if (roles.length > 1) {
      router.push(AppRoutes.AUTH);
      return;
    }

    const role = roles[0];
    const roleDefinition = Object.values(roleDefinitions).find(
      (r) => r._id === role
    ) as RoleDefinitionValue | undefined;

    if (!roleDefinition) {
      setApiError('Role definition not found.');
      return;
    }

    const path = getLandingPageByRole(roleDefinition);

    if (!path) {
      setApiError(
        `Landing page path not found for the role: ${roleDefinition.name}`
      );
      return;
    }

    router.push(path);
  };

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    setApiError('');
    try {
      if (rememberMe) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('password', data.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      const resultAction = await dispatch(login(data));

      if (login.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;
        handleLoginResult(payload?.data);
        setLocalUserInfo(resultAction.payload?.data);
      } else {
        const errorMessage =
          resultAction.payload || 'An unexpected error occurred during login';
        setApiError(errorMessage);
      }
    } catch (error: any) {
      setApiError(error.message || 'An unexpected error occurred during login');
    }
  };

  return (
    <BoxContainer sx={{ display: 'flex', height: '100vh' }}>
      {!isMobile && (
        <BoxContainer>
          <Image
            width={0}
            unoptimized
            height={0}
            src='/landing-page.png'
            alt='Login'
            style={{ width: '50vw', height: '100vh', objectFit: 'cover' }}
          />
        </BoxContainer>
      )}
      <BoxContainer
        additionalStyles={{
          width: { xs: '100%', sm: '50vw' },
          justifyContent: 'center',
        }}
      >
        <BoxContainer
          sx={{
            gap: '10px',
            justifyContent: 'center',
            width: { xs: '100%', sm: '60%' },
            margin: 'auto',
            padding: '10px',
          }}
        >
          <TitleSubSection style={{ textAlign: 'center', padding: '10px' }}>
            <strong>Login</strong>
          </TitleSubSection>

          <FormSubtitle text='Enter you email and password to Sign in' />

          <BoxContainer onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  fullWidth
                  placeholder='Email'
                  label='Email'
                />
              )}
            />
            <ErrorDisplay message={errors.email?.message} />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                // <TextInput
                //   {...field}
                //   fullWidth
                //   type='password'
                //   placeholder='Password'
                //   label='Password'
                // />
                <PasswordField {...field} fullWidth label='Password' />
              )}
            />
            <ErrorDisplay message={errors.password?.message} />
            {apiError && <ErrorDisplay message={apiError} />}
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label='Remember me'
              />
              <Link
                onClick={() => router.push(AppRoutes.FORGOT_PASSWORD)}
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <Typography variant='body2'>
                  <strong>Forgot Password ?</strong>
                </Typography>
              </Link>
            </Box>

            <Button type='submit' loading={loading}>
              Login
            </Button>
            <DividerWithText />

            <SocialMediaLink />

            <Box
              sx={{
                display: 'flex',
                textAlign: 'center',
                margin: 'auto',
                marginTop: '10px',
              }}
            >
              <Typography variant='body2'>
                Do not have an account?
                <Link
                  sx={{
                    color: `${theme.palette.primary.dark}`,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    padding: '10px',
                  }}
                  onClick={() => router.push(AppRoutes.SIGNUP)}
                >
                  <strong>Sign Up</strong>
                </Link>
              </Typography>
            </Box>
          </BoxContainer>
        </BoxContainer>
      </BoxContainer>
    </BoxContainer>
  );
};
