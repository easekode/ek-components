import { useState, useMemo } from 'react';
import {
  BoxContainer,
  SearchBar,
  useIsMobile,
  Loading,
  ErrorDisplay,
  useModalManager,
} from '@ek-components';
import { SearchPaginationTypes } from '@ek-components/Table/types';
import { Button, Divider, Grid } from '@mui/material';
import { AddUserModal } from '../AddUserModal';
import { EditUserModal } from '../EditUserModal';
import { DeleteUserModal } from '../DeleteUserModal';
import { UserTable } from '../helper/userTable';
import { useFetchUsersQuery } from '@/redux/slices/admin/adminUserApis';
import { IUser } from '@ek-types';

export const AdminUsers: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const modalManager = useModalManager();

  const { data: result, isLoading, error, refetch } = useFetchUsersQuery();

  const users = result?.data.data;
  const totalUsers = result?.data.totalResult;

  const filteredUsers = useMemo(() => {
    return (
      users?.filter((user) =>
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [users, searchQuery]);

  const getUsers = async (pageParams: SearchPaginationTypes) => {
    if (!users) return { data: [], totalResult: 0 };

    return {
      data: filteredUsers.slice(
        (pageParams.page - 1) * pageParams.itemsPerPage,
        pageParams.page * pageParams.itemsPerPage
      ),
      totalResult: totalUsers || 0,
    };
  };

  const handleEditClick = (user: IUser) => {
    modalManager.openModal(
      <EditUserModal
        user={user}
        onClose={modalManager.closeModal}
        onSave={() => {
          modalManager.closeModal();
          refetch();
        }}
      />
    );
  };

  const handleAddUser = () => {
    modalManager.openModal(
      <AddUserModal
        user={{ email: '' }}
        onClose={modalManager.closeModal}
        onAdd={() => {
          modalManager.closeModal();
          refetch();
        }}
      />
    );
  };

  const handleDeleteUserClick = (user: IUser) => {
    modalManager.openModal(
      <DeleteUserModal
        isOpen={true}
        user={user}
        onClose={() => {
          modalManager.closeModal();
          refetch();
        }}
      />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !users) {
    return <ErrorDisplay />;
  }

  return (
    <BoxContainer>
      <Grid
        container
        spacing={2}
        alignItems='center'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid item xs={12} md={6}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md='auto' textAlign={isMobile ? 'center' : 'right'}>
          <Button variant='contained' color='primary' onClick={handleAddUser}>
            Add New User
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <BoxContainer
        sx={{
          mt: 2,
          width: '100%',
          ...(isMobile && {
            display: 'block',
            overflowX: 'auto',
          }),
        }}
      >
        {filteredUsers.length > 0 && (
          <UserTable
            users={filteredUsers}
            getUsers={getUsers}
            handleEditClick={handleEditClick}
            handleDeleteUserClick={handleDeleteUserClick}
          />
        )}
      </BoxContainer>
    </BoxContainer>
  );
};
