'use client';

import { AppRoutes } from '@/config/appRoutes';
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
} from '@ek-components/index';
import Image from 'next/image';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { getErrorMessage, postApi, putApi } from '@/utils';
import { ApiUrl } from '@/config/api';
import OtpInput from 'react-otp-input';

export const OtpVerifyForm = () => {
  const { showAlert } = useContext(AlertContext);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState('');

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (otp: string) => {
      return await putApi<{ accessToken: string; refreshToken: string }>({
        url: ApiUrl.VERIFY_USER,
        data: { otp },
      });
    },
  });

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await mutateAsync(otp);
      console.log('response', response);
      setSubmitted(true);
      showAlert && showAlert({ message: 'OTP verified successfully' });
      router.push(AppRoutes.LOGIN);
    } catch (error: any) {
      console.log(error);
      setApiError(getErrorMessage(error));
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
            <strong>Verify OTP</strong>
          </TitleSubSection>

          <FormSubtitle text='Input OTP received to verify' />

          <BoxContainer onSubmit={onSubmit}>
            {!submitted ? (
              <Box sx={{ alignSelf: 'center' }}>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
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
                <ErrorDisplay message={apiError} />
              </Box>
            ) : (
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                OTP verified successfully
              </Typography>
            )}

            <Button
              type='submit'
              fullWidth
              loading={isPending}
              disabled={submitted}
              sx={{ marginTop: '20px' }}
            >
              Verify OTP
            </Button>
          </BoxContainer>
        </BoxContainer>
      </BoxContainer>
    </BoxContainer>
  );
};
