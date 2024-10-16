'use client';

import { AppRoutes } from '@ek-components/config/appRoutes';
import {
  Button,
  BoxContainer,
  TextInput,
  TitleSubSection,
  useIsMobile,
  theme,
  AlertContext,
  FormSubtitle,
  DividerWithText,
  SocialMediaLink,
  ErrorDisplay,
  PasswordField,
} from '@ek-components/index';
import Image from 'next/image';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@ek-components/utils';
import { ApiUrl } from '@ek-components/config/api';
import OtpInput from 'react-otp-input';

interface IFormInput {
  otp: string;
  password: string;
}

export const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>();

  const { showAlert } = useContext(AlertContext);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IFormInput) => {
      return await postApi<{ accessToken: string; refreshToken: string }>({
        url: ApiUrl.RESET_PASSWORD,
        data: { otp: data.otp, password: data.password },
      });
    },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      await mutateAsync(data);
      setSubmitted(true);
      showAlert &&
        showAlert({ message: 'Password has been reset, please login' });
      router.push(AppRoutes.LOGIN);
    } catch (error: any) {
      setApiError(error.message);
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
            <strong>Reset Password?</strong>
          </TitleSubSection>

          <FormSubtitle text='Input OTP received and new password to reset' />

          <BoxContainer component='form' onSubmit={handleSubmit(onSubmit)}>
            {!submitted ? (
              <>
                <Controller
                  name='otp'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'OTP is required' }}
                  render={({ field }) => (
                    <BoxContainer sx={{ alignSelf: 'center' }}>
                      <OtpInput
                        value={field.value}
                        onChange={field.onChange}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        inputStyle={{
                          width: '2.5rem',
                          height: '2.5rem',
                          margin: '0 1rem',
                          fontSize: '1rem',
                          borderRadius: 4,
                          border: '1px solid rgba(0,0,0,0.3)',
                        }}
                        renderInput={(props) => <input {...props} />}
                      />
                    </BoxContainer>
                  )}
                />
                <ErrorDisplay message={errors.otp?.message} />

                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <PasswordField
                      {...field}
                      fullWidth
                      label='Password'
                      placeholder='Change Password'
                    />
                  )}
                />
                <ErrorDisplay message={errors.password?.message} />
                <ErrorDisplay message={apiError} />
              </>
            ) : (
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                Password has been reset, please login
              </Typography>
            )}

            <Button
              type='submit'
              fullWidth
              disabled={submitted}
              loading={isPending}
              sx={{ marginTop: '20px' }}
            >
              Reset password
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
                    padding: '10px',
                  }}
                  onClick={() => router.push(AppRoutes.LOGIN)}
                >
                  <strong>Login</strong>
                </Link>
              </Typography>
            </Box>
          </BoxContainer>
        </BoxContainer>
      </BoxContainer>
    </BoxContainer>
  );
};
