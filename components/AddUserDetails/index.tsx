import React, { useState } from 'react';
import { BoxContainer } from '../Container/BoxContainer/index';
import { TitleHeader } from '../index';
import { TextField } from '../index';
import { FormFieldLabels } from '../../src/constants/formFields';
import { OkCancel } from '../index';

export interface UserDetails {
  username: string;
  email: string;
  phoneNumber: string;
}

interface AddUserDetailsProps {
  onSave: (userDetails: UserDetails) => void;
  onCancel: () => void;
}

const AddUserDetails: React.FC<AddUserDetailsProps> = ({
  onSave,
  onCancel,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: '',
    email: '',
    phoneNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = () => {
    onSave(userDetails);
    setUserDetails({
      username: '',
      email: '',
      phoneNumber: '',
    });
  };

  return (
    <form>
      <BoxContainer
        additionalStyles={{
          padding: '10px',
        }}
      >
        <TitleHeader title='Add User Detail' />

        <TextField
          name='username'
          value={userDetails.username}
          onChange={handleInputChange}
          placeholder={FormFieldLabels.USER_NAME}
          label={FormFieldLabels.USER_NAME}
        />

        <TextField
          name='email'
          value={userDetails.email}
          onChange={handleInputChange}
          placeholder={FormFieldLabels.EMAIL}
          label={FormFieldLabels.EMAIL}
        />

        <TextField
          name='phoneNumber'
          value={userDetails.phoneNumber}
          onChange={handleInputChange}
          placeholder={FormFieldLabels.PHONE_NO}
          label={FormFieldLabels.PHONE_NO}
        />
        <OkCancel primaryProps={{ onClick: handleSave }} secondaryProps={{}} />
      </BoxContainer>
    </form>
  );
};

export default AddUserDetails;
