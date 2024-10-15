import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { BoxContainer } from '@ek-components/Container';
import { TitleSubSection } from '@ek-components/TitleHeader';
import { IAddress } from '@ek-types';

interface AddressProps {
  address: IAddress[] | undefined;
  onChange: (updatedAddresses: IAddress[]) => void;
  sx?: any;
}

const emptyAddress: IAddress = {
  address: '',
  city: '',
  state: '',
  country: '',
  landmark: '',
  pinCode: '',
  location: {
    type: 'Point',
    coordinates: [0, 0],
  },
};

export const Address: React.FC<AddressProps> = ({
  address,
  onChange,
  ...props
}) => {
  const handleAddressChange = (
    index: number,
    key: keyof IAddress,
    value: any
  ) => {
    const updatedAddresses = address ? [...address] : [emptyAddress];
    updatedAddresses[index] = { ...updatedAddresses[index], [key]: value };
    onChange(updatedAddresses);
  };

  const handleLocationChange = (
    index: number,
    coordinates: number[],
    type: string
  ) => {
    const updatedAddresses = address ? [...address] : [emptyAddress];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      location: { type: type || 'Point', coordinates },
    };
    onChange(updatedAddresses);
  };

  return (
    <BoxContainer sx={{ mt: 10 }}>
      {(address && address.length > 0 ? address : [emptyAddress]).map(
        (addr, index) => (
          <BoxContainer key={index}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{ mb: 10, pr: 3 }}>
                <TextField
                  label='Street'
                  value={addr.address || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'address', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 10, pl: 3 }}>
                <TextField
                  label='City'
                  value={addr.city || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'city', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 10, pr: 3 }}>
                <TextField
                  label='State'
                  value={addr.state || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'state', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 10, pl: 3 }}>
                <TextField
                  label='Country'
                  value={addr.country || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'country', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ pr: 3 }}>
                <TextField
                  label='Landmark'
                  value={addr.landmark || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'landmark', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ pr: 3 }}>
                <TextField
                  label='Pin Code'
                  value={addr.pinCode || ''}
                  onChange={(e) =>
                    handleAddressChange(index, 'pinCode', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12} sx={{ mb: 10 }}>
                <TextField
                  label='Location Coordinates'
                  value={addr.location?.coordinates.join(', ') || ''}
                  onChange={(e) => {
                    const coords = e.target.value.split(',').map(Number);
                    handleLocationChange(
                      index,
                      coords,
                      addr.location?.type || 'Point'
                    );
                  }}
                  fullWidth
                />
                <Typography variant='body1'>
                  <strong>Location Type:</strong>{' '}
                  {addr.location?.type || 'Point'}
                </Typography>
              </Grid> */}
            </Grid>
          </BoxContainer>
        )
      )}
    </BoxContainer>
  );
};
