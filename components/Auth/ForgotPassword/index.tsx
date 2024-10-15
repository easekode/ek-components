import { AppRoutes } from '@/config/appRoutes';
import {
  Button,
  BoxContainer,
  TitleSubSection,
  theme,
  useIsMobile,
  TextInput,
  FormSubtitle,
  ErrorDisplay,
} from '@ek-components/index';
import Image from 'next/image';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { postApi } from '@/utils';
import { ApiUrl } from '@/config/api';

interface IFormInput {
  email: string;
}

export const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>();

  const router = useRouter();
  const isMobile = useIsMobile();

  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IFormInput) => {
      return await postApi<{
        message: string;
      }>({
        url: ApiUrl.FORGOT_PASSWORD,
        data,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await mutateAsync(data);
      // console.log(response);
      setResponseMessage(response.message);
      setSubmitted(true);
      router.push(AppRoutes.RESET_PASSWORD); //
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
            <strong>Forgot Password?</strong>
          </TitleSubSection>

          <FormSubtitle text='No worries, we will assist you' />

          <BoxContainer component='form' onSubmit={handleSubmit(onSubmit)}>
            {!submitted ? (
              <>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                <ErrorDisplay
                  message={errors.email?.message}
                  // apiError={apiError}
                />
              </>
            ) : (
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                {responseMessage}
              </Typography>
            )}

            <Button
              type='submit'
              fullWidth
              disabled={submitted}
              loading={isPending}
              sx={{ marginTop: '20px' }}
            >
              Send OTP
            </Button>

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
