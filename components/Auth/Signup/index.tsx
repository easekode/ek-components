import { useContext, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import {
  Button,
  DividerWithText,
  ErrorDisplay,
  FormSubtitle,
  SocialMediaLink,
  useIsMobile,
} from '../../index';
import {
  TitleSubSection,
  BoxContainer,
  AlertContext,
  TextInput,
  theme,
  PasswordField,
} from '@ek-components/index';
import { ApiUrl } from '@ek-components/config/api';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@ek-components/utils';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@ek-components/config/appRoutes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { VerifyOtp } from '../ConfirmSignup/index';

export interface IFormInput {
  email: string;
  password: string;
  username: string;
  phoneNumber: number;
}

export const SignupComponent = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isMobile = useIsMobile();
  const [apiError, setApiError] = useState('');
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IFormInput) => {
      return await postApi({
        url: ApiUrl.REGISTER,
        data,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      await mutateAsync(data);
      showAlert && showAlert({ message: 'User registered successfully' });
      setIsSubmitted(false);
      router.push(AppRoutes.VERIFY_OTP);
    } catch (error: any) {
      setApiError(error.response.data.message);
      console.log('error--->', error.response.data.message);
    }
  };

  return (
    <BoxContainer sx={{ display: 'flex' }}>
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
        {isSubmitted ? (
          <VerifyOtp />
        ) : (
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
              <strong>Sign Up</strong>
            </TitleSubSection>

            <FormSubtitle text='Enter your name, email and phone number to sign up' />

            <BoxContainer component='form' onSubmit={handleSubmit(onSubmit)}>
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
                  <PasswordField {...field} fullWidth label='Password' />
                )}
              />
              <ErrorDisplay message={errors.password?.message} />
              {apiError && (
                <Typography
                  variant='body2'
                  color='error'
                  sx={{ marginTop: '8px' }}
                >
                  {apiError}
                </Typography>
              )}

              {/* <Controller
                name='phoneNumber'
                control={control}
                defaultValue={undefined}
                rules={{ required: 'Phone Number  is required' }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    fullWidth
                    type='number'
                    placeholder='phoneNumber'
                    label='Phone Number'
                    helperText={errors.phoneNumber?.message}
                    InputProps={{ style: { fontSize: '0.8rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.8rem' } }}
                  />
                )}
              /> */}
              <Button
                type='submit'
                fullWidth
                sx={{ marginTop: '20px' }}
                loading={isPending}
              >
                Sign Up
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
                  Already have an account?
                  <Link
                    sx={{
                      color: `${theme.palette.primary.dark}`,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      padding: '0.5rem',
                    }}
                    onClick={() => router.push(AppRoutes.LOGIN)}
                  >
                    <strong>Login</strong>
                  </Link>
                </Typography>
              </Box>
            </BoxContainer>
          </BoxContainer>
        )}
      </BoxContainer>
    </BoxContainer>
  );
};
