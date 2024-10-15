import { useState } from 'react';
import { ListItem } from '@mui/material';
import {
  TitleSection,
  TitleSubSection,
  OkCancel,
  ErrorDisplay,
  BoxContainer,
} from '@ek-components';
import { InvitationStatus, IInvitation } from '@ek-types';
import { useAcceptRejectInvitationMutation } from '@/redux/slices/invitation/invitationsApi';

interface InvitationListItemProps {
  invitation: IInvitation;
  onDone: () => void;
  onSuccess: (message: string) => void;
}

export const InvitationListItem = ({
  invitation,
  onDone,
  onSuccess,
}: InvitationListItemProps) => {
  const [loadingState, setLoadingState] = useState<'accept' | 'reject' | null>(
    null
  );
  const [acceptRejectInvitation] = useAcceptRejectInvitationMutation();

  const handleAcceptReject = async (status: InvitationStatus) => {
    setLoadingState(status === InvitationStatus.ACCEPTED ? 'accept' : 'reject');
    try {
      const data = { code: invitation.code as string, status };
      await acceptRejectInvitation(data).unwrap();
      const successMsg =
        status === InvitationStatus.ACCEPTED
          ? 'Invitation has been accepted!'
          : 'Invitation has been declined!';
      onSuccess(successMsg);
      onDone();
    } catch (error) {
      <ErrorDisplay message={(error as Error)?.toString()} />;
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <ListItem
      key={invitation._id?.toString() || ''}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 10,
        position: 'relative',
      }}
    >
      <BoxContainer sx={{ width: '100%' }}>
        <TitleSection variant='body1'>
          <strong>Course:</strong>
          <TitleSection variant='body1'>
            {invitation?.course?.title || ''}
          </TitleSection>
        </TitleSection>
        <TitleSection variant='body2'>
          <strong>Batch:</strong>
          <TitleSubSection variant='body2'>
            {invitation?.batch?.name || ''}
          </TitleSubSection>
        </TitleSection>
      </BoxContainer>
      <BoxContainer
        sx={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <OkCancel
          primaryProps={{
            onClick: () => handleAcceptReject(InvitationStatus.ACCEPTED),
            children: 'Accept',
            loading: loadingState === 'accept',
          }}
          secondaryProps={{
            onClick: () => handleAcceptReject(InvitationStatus.REJECTED),
            children: 'Decline',
            loading: loadingState === 'reject',
          }}
        />
      </BoxContainer>
    </ListItem>
  );
};
