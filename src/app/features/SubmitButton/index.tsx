'use client';
import { AppRoutes } from '@/config/appRoutes';
import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

export const SubmitButton = (props: ButtonProps) => {
  const router = useRouter();
  const handleSubmitClick = () => {
    router.push(AppRoutes.DASHBOARD);
  };

  return (
    <Button
      name='Submit'
      {...props}
      onClick={() => {
        handleSubmitClick();
      }}
    >
      Submit
    </Button>
  );
};
