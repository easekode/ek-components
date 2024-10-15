import { useState } from 'react';
import { FormControl, TextField, Box } from '@mui/material';
import { MuiTelInput, MuiTelInputInfo } from 'mui-tel-input';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';
import { CreateUserBody, IUser } from '@ek-types';
import {
  BoxContainer,
  TitleSubSection,
  OkCancel,
  CustomAvatar,
  ErrorDisplay,
  PasswordField,
  RoleSelection,
  theme,
} from '@ek-components';
import { useAddUserMutation } from '@/redux/slices/admin/adminUserApis';

interface AddUserModalProps {
  user: IUser;
  onClose: () => void;
  onAdd: (newUser: IUser) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  user,
  onClose,
  onAdd,
}) => {
  const initialNewUser: CreateUserBody = {
    email: user?.email || '',
    password: '',
    mobile: user?.mobile || '',
    name: user?.name || '',
    roleId: '',
  };

  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<CreateUserBody>(initialNewUser);

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handlePhoneChange = (value: string) => {
    setNewUser({ ...newUser, mobile: value });
  };

  const handleSave = async () => {
    if (!newUser.mobile || error) {
      setError('Please provide a valid phone number.');
      return;
    }

    try {
      await addUser({ body: newUser }).unwrap();
      onAdd(newUser);
      onClose();
    } catch (error) {
      setError('Error saving user. Please try again.');
    }
  };

  const handleRoleChange = (event: any, value: any) =>
    setNewUser({
      ...newUser,
      roleId: value?.length > 0 ? value[0]?._id?.toString() : '',
    });

  return (
    <BoxContainer
      sx={{
        padding: '20px',
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        minWidth: '300px',
      }}
    >
      <TitleSubSection variant='h6'>New User Details</TitleSubSection>
      <BoxContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <CustomAvatar name={newUser.name || ''} profilePicture='' />
      </BoxContainer>

      {error && <ErrorDisplay message={error} />}

      <FormControl fullWidth sx={{ marginTop: '20px' }}>
        {['Name', 'Email'].map((label) => (
          <TextField
            key={label}
            label={label}
            name={label.toLowerCase()}
            value={newUser[label.toLowerCase()] || ''}
            onChange={handleChange}
            fullWidth
            sx={{ marginTop: '20px' }}
          />
        ))}

        <Box sx={{ marginTop: '20px' }}>
          <MuiTelInput
            defaultCountry='IN'
            value={newUser.mobile || ''}
            onChange={handlePhoneChange}
            fullWidth
          />
        </Box>

        <PasswordField
          name='password'
          value={newUser.password || ''}
          onChange={handleChange}
          fullWidth
          sx={{ marginTop: '20px' }}
        />
      </FormControl>

      <RoleSelection
        selectedRoles={newUser?.roleId?.toString() || ''}
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
