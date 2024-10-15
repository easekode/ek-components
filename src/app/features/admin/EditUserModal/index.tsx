import { FormControl, TextField, Box } from '@mui/material';
import { IUser, IAddress } from '@ek-types';
import {
  TitleSubSection,
  OkCancel,
  BoxContainer,
  CustomAvatar,
  Address,
  ErrorDisplay,
  PasswordField,
  RoleSelection,
} from '@ek-components';
import { useState } from 'react';
import { useEditUserMutation } from '@/redux/slices/admin/adminUserApis';

const renderTextField = (
  label: string,
  name: string,
  value: string,
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
  type: 'text' | 'password' = 'text'
) => (
  <TextField
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    sx={{ marginTop: '20px' }}
  />
);

interface EditUserModalProps {
  user: IUser;
  onClose: () => void;
  onSave: (updatedUser: IUser) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<IUser>({
    ...user,
    roles: user.roles || [],
    address: user.address || [],
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (event: any, value: any) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      roles: value.map((role: any) => role._id),
    }));
  };

  const handleAddressChange = (updatedAddresses: IAddress[]) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      address: updatedAddresses,
    }));
  };

  const handleSave = async () => {
    if (!editedUser._id || typeof editedUser._id !== 'string') {
      setError('User ID is missing or invalid. Please try again.');
      return;
    }
    try {
      await editUser({
        body: editedUser,
        params: {
          id: editedUser._id,
        },
      }).unwrap();
      onSave(editedUser);
    } catch (error) {
      setError('Error saving user. Please try again.');
    }
  };

  return (
    <BoxContainer
      sx={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        minWidth: '300px',
      }}
    >
      <TitleSubSection variant='h6'>Edit User Details</TitleSubSection>
      <BoxContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <CustomAvatar
          name={editedUser.name || ''}
          profilePicture={''}
          sx={{
            width: 75,
            height: 75,
            marginBottom: 8,
          }}
        />
      </BoxContainer>
      {error && <ErrorDisplay message={error} />}{' '}
      <FormControl fullWidth sx={{ marginTop: '20px' }}>
        {renderTextField('Name', 'name', editedUser.name || '', handleChange)}
        <PasswordField
          name='password'
          value={editedUser.password || ''}
          onChange={handleChange}
        />
        {renderTextField(
          'Email',
          'email',
          editedUser.email || '',
          handleChange
        )}
        <Address
          address={editedUser.address || []}
          onChange={handleAddressChange}
        />
      </FormControl>
      <RoleSelection
        selectedRoles={editedUser.roles || ''}
        onRoleChange={handleRoleChange}
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
      >
        <OkCancel
          primaryProps={{
            onClick: handleSave,
            disabled: isLoading,
            children: isLoading ? 'Loading...' : 'Save',
          }}
          secondaryProps={{ onClick: onClose }}
        />
      </Box>
    </BoxContainer>
  );
};
