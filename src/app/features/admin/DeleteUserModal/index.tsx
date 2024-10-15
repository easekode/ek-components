import { useState } from 'react';
import {
  TitleSubSection,
  BoxContainer,
  OkCancel,
  CustomAvatar,
  ErrorDisplay,
} from '@ek-components';
import { IUser } from '@ek-types';
import { useDeleteUserMutation } from '@/redux/slices/admin/adminUserApis';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: IUser | null;
  onClose: () => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  user,
  onClose,
}) => {
  const [error, setError] = useState<string | null>(null);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  if (!isOpen || !user) {
    return null;
  }

  const handleDelete = async () => {
    if (!user._id || typeof user._id !== 'string') {
      setError('User ID is missing or invalid. Please try again.');
      return;
    }
    try {
      await deleteUser({
        body: undefined,
        params: {
          id: user._id,
        },
      }).unwrap();
      onClose();
    } catch (error) {
      setError('Error deleting user. Please try again.');
    }
  };

  return (
    <BoxContainer sx={{ pb: 20, pt: 20, mb: 10, mt: 10, textAlign: 'center' }}>
      <BoxContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          mb: 10,
        }}
      >
        <CustomAvatar name={user.name || ''} profilePicture={''} />
      </BoxContainer>
      <TitleSubSection variant='h6'>
        Are you sure you want to delete this user?
      </TitleSubSection>

      {error && <ErrorDisplay message={error} />}

      <BoxContainer
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '20px',
        }}
      >
        <OkCancel
          primaryProps={{
            onClick: handleDelete,
            disabled: isLoading,
            children: isLoading ? 'Loading...' : 'Delete',
          }}
          secondaryProps={{ onClick: onClose, children: 'Cancel' }}
        />
      </BoxContainer>
    </BoxContainer>
  );
};
