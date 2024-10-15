'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/config/appRoutes';
import { BoxContainer, TitleSubSection, useIsMobile } from '@ek-components';
import Image from 'next/image';
import { useAuthScreen } from './AuthScreenContext';
import { getLocalUserInfo } from '@ek-components/Auth/authToken';
import { roleDefinitions } from '@ek-types';

const AuthScreen = () => {
  const isMobile = useIsMobile();
  const { setRole } = useAuthScreen();
  const router = useRouter();
  const localUserInfo = getLocalUserInfo();
  const [roles, setRoles] = useState<Array<{ name: string; slug: string }>>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleData = localUserInfo.profile?.roles || [];
  if (roles.length === 0) {
    const mappedRoles = roleData
      .map((roleId: any) => {
        const role = Object.values(roleDefinitions).find(
          (role) => role._id === roleId
        );
        return role ? { name: role.name, slug: role.slug } : null;
      })
      .filter(
        (role: any): role is { name: string; slug: string } => role !== null
      );
    setRoles(mappedRoles);
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSelectClick = () => {
    if (selectedRole) {
      setRole(selectedRole);
      router.push(getRouteForRole(selectedRole));
    }
  };

  const getRouteForRole = (role: string) => {
    const routes: { [key: string]: string } = {
      student: AppRoutes.STUDENT_DASHBOARD,
      instructor: AppRoutes.TEACHER_DASHBOARD,
      admin: AppRoutes.ADMIN_DASHBOARD,
    };
    return routes[role] || '/';
  };

  return (
    <BoxContainer sx={{ display: 'flex' }}>
      {!isMobile && (
        <BoxContainer>
          <Image
            width={0}
            unoptimized
            height={0}
            src='/landing-page.png'
            alt='Login'
            style={{ width: '50vw', height: '100vh', objectFit: 'cover' }}
          />
        </BoxContainer>
      )}
      <BoxContainer
        additionalStyles={{
          border: '1px solid green',
          width: { xs: '100%', sm: '50vw' },
          justifyContent: 'center',
          padding: 'auto',
        }}
      >
        <BoxContainer
          sx={{
            gap: '10px',
            justifyContent: 'center',
            width: { xs: '100%', sm: '60%' },
            margin: 'auto',
            height: '100vh',
            padding: '10px',
          }}
        >
          <TitleSubSection
            style={{ textAlign: 'center', marginTop: '30px', padding: '10px' }}
          >
            <strong>Select Role</strong>
          </TitleSubSection>
          <FormControl
            component='fieldset'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <RadioGroup
              aria-label='role'
              name='role'
              value={selectedRole}
              onChange={handleRoleChange}
            >
              {roles.map((role) => (
                <FormControlLabel
                  key={role.slug}
                  value={role.name}
                  control={<Radio />}
                  label={role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSelectClick}
              disabled={!selectedRole}
              sx={{ marginTop: '20px' }}
            >
              Select
            </Button>
          </Box>
        </BoxContainer>
      </BoxContainer>
    </BoxContainer>
  );
};

export default AuthScreen;
