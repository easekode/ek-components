import { BoxContainer } from '../Container/index';
import { Button, EkButtonProps } from '../index';

export interface OkCancelProps {
  primaryProps: EkButtonProps;
  secondaryProps: EkButtonProps;
  loading?: boolean;
}
export const OkCancel = ({
  primaryProps,
  secondaryProps,
  loading,
}: OkCancelProps) => {
  const { children: primaryChilren, ...restPrimary } = primaryProps;
  const { children: secondaryChildren, ...restSecondary } = secondaryProps;
  return (
    <BoxContainer
      additionalStyles={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <Button variant='outlined' {...restSecondary}>
        {secondaryChildren || 'Cancel'}
      </Button>
      <Button disabled={loading} {...restPrimary}>
        {primaryChilren || 'Save'}
      </Button>
    </BoxContainer>
  );
};
