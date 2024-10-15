import * as React from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { roleDefinitions, RoleDefinitionValue } from '@ek-types';

export const RoleSelection = ({ selectedRoles, onRoleChange }) => {
  const roleOptions: RoleDefinitionValue[] = Object.keys(roleDefinitions).map(
    (roleKey) => ({
      _id: roleDefinitions[roleKey]._id,
      name: roleDefinitions[roleKey].name,
      slug: roleDefinitions[roleKey].slug,
    })
  );

  return (
    <FormControl fullWidth sx={{ marginTop: '20px' }}>
      <Autocomplete
        multiple
        options={roleOptions}
        getOptionLabel={(option) => option.name}
        value={roleOptions?.filter((option) =>
          selectedRoles?.includes(option?._id?.toString())
        )}
        onChange={(event, value, reason, details) =>
          onRoleChange(event, value, reason, details)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label='Roles'
            variant='outlined'
            sx={{
              marginTop: '20px',
              '& .MuiInputBase-root': {
                padding: '10px 14px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};
