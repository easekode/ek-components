'use client';
import {
  Button,
  BoxContainer,
  OkCancel,
  TitleHeader,
  ErrorDisplay,
  Loading,
  theme,
  TitleSection,
} from '@ek-components';
import { ApiUrl } from '@/config/api';
import { postApi } from '@/utils/index';
import { BoxProps, Divider } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { ICourseBatch, NewBatchAssnBodyType } from '@ek-types';
import { ModalContext } from '@ek-components/Modal/ModalContext';
import { SearchEmails } from '../SearchEmails/index';
import { Schema } from 'mongoose';
import { CheckCircleOutline, GroupAddOutlined } from '@mui/icons-material';

export const InviteUsers = ({ batch, successMessage, onSuccess }) => {
  const [data, setData] = useState<NewBatchAssnBodyType>({
    batchId: batch?._id as Schema.Types.ObjectId,
    emails: [],
  });
  const [formVisible, setFormVisible] = useState(true);
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (data: NewBatchAssnBodyType) =>
      postApi({
        url: ApiUrl.INVITATION,
        data,
      }),
  });
  // console.log('Data to be send out', data);

  const handleEmailsChange = (emails: string[]) => {
    setData((prevData) => ({
      ...prevData,
      batchId: batch?._id as Schema.Types.ObjectId,
      emails,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(data as NewBatchAssnBodyType);
      setFormVisible(false);
      onSuccess?.('Invitation sent successfully');
    } catch (error) {
      <ErrorDisplay message='An error occured' />;
    }
  };

  return (
    <>
      <BoxContainer
        component='form'
        onSubmit={handleSubmit}
        additionalStyles={{ padding: '20px' }}
      >
        {isError && (
          <ErrorDisplay message='There was an error sending the invitation link' />
        )}

        <GroupAddOutlined />
        <TitleHeader title='Invite users to this course' />
        <Divider />
        {!formVisible ? (
          <BoxContainer
            sx={{
              margin: 'auto',
              color: theme.palette.success.dark,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <CheckCircleOutline sx={{ fontSize: '50px', margin: 'auto' }} />
            <TitleSection variant='h5'>Success</TitleSection>
            {successMessage}
          </BoxContainer>
        ) : (
          <BoxContainer>
            <SearchEmails onChange={handleEmailsChange} />
            <BoxContainer sx={{ mt: '50px' }}>
              <OkCancel
                primaryProps={{ children: 'Invite', type: 'submit' }}
                secondaryProps={{}}
                loading={isPending}
              />
            </BoxContainer>
          </BoxContainer>
        )}
      </BoxContainer>
    </>
  );
};

export const InviteUserModal = ({ batch }: { batch: ICourseBatch }) => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
  };

  return (
    <InviteUsers
      batch={batch}
      successMessage={successMessage}
      onSuccess={handleSuccess}
    />
  );
};

export interface InviteUserButtonProps extends BoxProps {
  batch: ICourseBatch;
}
export const InviteUserButton = (props: InviteUserButtonProps) => {
  const { batch, children, ...rest } = props;
  const { setModalContent, setIsOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        setModalContent && setModalContent(<InviteUserModal batch={batch} />);
        setIsOpen && setIsOpen(true);
      }}
      disabled={loading}
      startIcon={loading ? <Loading height='0vh' message='' /> : null}
    >
      {children || 'Invite Users'}
    </Button>
  );
};
