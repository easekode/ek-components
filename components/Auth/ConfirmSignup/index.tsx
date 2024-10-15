import React from 'react';
import { useContext } from 'react';
import { ApiUrl } from '@/config/api';
import { useMutation } from '@tanstack/react-query';
import { putApi } from '@/utils';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@ek-components/index';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextInput } from '../../TextInput/input';
import {
  BoxContainer,
  TitleSubMain,
  TitleSubSection,
  Button,
} from '@ek-components/index';

export interface IFormInput {
  code: string;
}

export const VerifyOtp: React.FunctionComponent = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>();

  const { showAlert } = useContext(AlertContext);
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: IFormInput) => {
      return await putApi({
        url: ApiUrl.VERIFY_USER,
        data,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      await mutateAsync(data);
      showAlert &&
        showAlert({ message: 'User registered successfully', type: 'success' });

      // router.push(AppRoutes.CONFIRM_EMAIL);
    } catch (error: any) {
      // console.log(error);
      showAlert && showAlert({ message: error.response.data, type: 'error' });
    }
  };

  return (
    <BoxContainer
      sx={{
        gap: '10px',
        justifyContent: 'center',
        width: { xs: '100%', sm: '50%' },
        margin: 'auto',
        padding: '10px',
      }}
    >
      <TitleSubMain style={{ textAlign: 'center', padding: '10px' }}>
        Verify OTP
      </TitleSubMain>
      <TitleSubSection style={{ textAlign: 'center', padding: '10px' }}>
        Enter OTP
      </TitleSubSection>
      <BoxContainer onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='code'
          control={control}
          defaultValue=''
          rules={{ required: 'OTP is requried' }}
          render={({ field }) => (
            <TextInput
              {...field}
              fullWidth
              placeholder='Enter OTP'
              label='Enter your OTP'
            />
          )}
        />

        <Button type='submit'>Submit</Button>
      </BoxContainer>
    </BoxContainer>
  );
};
