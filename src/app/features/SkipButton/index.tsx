/* 'use client';
import { useRouter } from 'next/navigation';

export interface SkipButtonProps {
  onSkipButtonClick: () => void;
}

export const SkipButton = (props: CTAButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(AppRotes.DASHBOARD);
  };

  return (
    <BoxContainer>
      <CTAButton
        name='Skip'
        {...props}
        onClick={() => {
          handleClick();
        }}
      />
    </BoxContainer>
  );
};
 */
