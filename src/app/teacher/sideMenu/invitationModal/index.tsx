import { useState } from 'react';
import { Divider, List } from '@mui/material';
import {
  CancelOutlined,
  CheckCircleOutline,
  MailOutline,
} from '@mui/icons-material';
import { TitleSubSection, ActionMessage, BoxContainer } from '@ek-components';
import { InvitationListItem } from '../helper';
import { IInvitation } from '@ek-types';

interface InvitationModalContentProps {
  pendingInvitations: IInvitation[];
  refetch: () => void;
}

export const InvitationModalContent = ({
  pendingInvitations,
  refetch,
}: InvitationModalContentProps) => {
  const [acceptedInvitations, setAcceptedInvitations] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredInvitations = pendingInvitations.filter(
    (invitation) =>
      !acceptedInvitations.includes(invitation._id?.toString() || '')
  );

  return (
    <BoxContainer sx={{ padding: '10px' }}>
      <BoxContainer
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <MailOutline sx={{ fontSize: '50px', mr: 1 }} />
        <TitleSubSection variant='h5'>Invitation</TitleSubSection>
      </BoxContainer>
      <Divider />
      {successMessage && (
        <BoxContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20vh',
            textAlign: 'center',
          }}
        >
          {successMessage === 'Invitation has been accepted!' ? (
            <>
              <CheckCircleOutline sx={{ fontSize: '50px', color: 'green' }} />
              <ActionMessage message={successMessage} sx={{ mt: 1 }} />
            </>
          ) : (
            <>
              <CancelOutlined sx={{ fontSize: '50px', color: 'red' }} />
              <ActionMessage message={successMessage} sx={{ mt: 1 }} />
            </>
          )}
        </BoxContainer>
      )}
      {filteredInvitations.length > 0 && (
        <List>
          {filteredInvitations.map((invitation) => (
            <InvitationListItem
              key={invitation._id?.toString() || ''}
              invitation={invitation}
              onDone={() => {
                setAcceptedInvitations((prev) => [
                  ...prev,
                  invitation._id?.toString() || '',
                ]);
                refetch();
              }}
              onSuccess={setSuccessMessage}
            />
          ))}
        </List>
      )}
    </BoxContainer>
  );
};
