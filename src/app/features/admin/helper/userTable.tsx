import { BoxContainer, CustomAvatar, Button, theme } from '@ek-components';
import { TableWithPagination } from '@ek-components/Table';
import { roleDefinitions } from '@ek-types';
import { Chip, Stack } from '@mui/material';

export const UserTable = ({
  getUsers,
  handleEditClick,
  handleDeleteUserClick,
}: any) => {
  const getRoleNameById = (roleId: string) => {
    const role = Object.values(roleDefinitions).find(
      (role) => role._id === roleId
    );
    return role ? role.name : 'No Role Assigned';
  };

  const getRoleChipColor = (roleName: string) => {
    switch (roleName) {
      case 'admin':
        return theme.palette.primary.main;
      case 'student':
        return theme.palette.success.main;
      case 'instructor':
        return theme.palette.info.main;
      case 'No Role Assigned':
        return theme.palette.warning.main;
      default:
        return theme.palette.background.default;
    }
  };

  const userColumns = [
    {
      field: 'name',
      headerName: 'Name',
      customField: (params: any) => (
        <BoxContainer sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            name={params.name || ''}
            profilePicture={params.profilePicture || ''}
          />
          <span style={{ marginLeft: 8 }}>{params.name}</span>
        </BoxContainer>
      ),
    },
    { field: 'email', headerName: 'Email' },
    {
      field: 'role',
      headerName: 'Roles',
      customField: (params: any) => {
        if (!params.roles || params.roles.length === 0) {
          return (
            <Chip
              label='No Role Assigned'
              sx={{
                backgroundColor: theme.palette.warning.main,
                color: 'white',
              }}
            />
          );
        }
        return (
          <Stack direction='row' spacing={1}>
            {params.roles.map((roleId: string) => {
              const roleName = getRoleNameById(roleId);
              const chipColor = getRoleChipColor(roleName);
              return (
                <Chip
                  key={roleId}
                  label={roleName}
                  sx={{
                    backgroundColor: chipColor,
                    color: theme.palette.background.default,
                  }}
                />
              );
            })}
          </Stack>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      customField: (params: any) => (
        <BoxContainer sx={{ display: 'flex' }}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => handleEditClick(params)}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleDeleteUserClick(params)}
            sx={{ ml: 5 }}
          >
            Delete
          </Button>
        </BoxContainer>
      ),
    },
  ];

  return <TableWithPagination columns={userColumns} getDataFn={getUsers} />;
};
