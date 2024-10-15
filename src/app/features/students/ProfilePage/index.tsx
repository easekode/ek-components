import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import {
  Mail,
  Phone,
  Edit,
  DateRange as DateRangeIcon,
  BusinessCenter,
  LocationCityOutlined,
  AddAPhotoRounded,
} from '@mui/icons-material';

import { theme, useIsMobile, UploadFile } from '@ek-components';
import { useRouter } from 'next/navigation';
import MyCertificate from '@/app/features/students/MyCertificate';
import Course from '@/app/features/students/Courses';

export const ProfileInfo = ({ icon, label, value }) => (
  <Grid container alignItems='center'>
    <Grid item xs={1}>
      {icon}
    </Grid>
    <Grid item xs={3}>
      <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const CircularProgressWithLabel = ({ value, profilePicture }) => {
  const isMobile = useIsMobile();

  return (
    <Box
      position='relative'
      display='inline-flex'
      flexDirection='column'
      alignItems='center'
      sx={{
        marginTop: isMobile ? '50px' : '0',
        marginLeft: isMobile ? '0' : '20px',
        marginBottom: isMobile ? '40px' : '0',
      }}
    >
      <CircularProgress
        variant='determinate'
        value={value}
        size={170}
        thickness={3}
        sx={{
          color: theme.palette.grey[600],
          position: 'absolute',
          top: -10,
          left: -10,
        }}
      />
      <Avatar
        src={profilePicture}
        sx={{
          width: 150,
          height: 150,
          marginBottom: 8,
        }}
      />
      <Box
        position='absolute'
        bottom={-30}
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box
          sx={{
            backgroundColor: theme.palette.grey[600],
            borderRadius: 1,
            padding: '4px 10px',
            marginTop: isMobile ? '10px' : '0',
            boxShadow: 3,
          }}
        >
          <Typography
            variant='body1'
            component='div'
            color={theme.palette.background.default}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ProfilePage = ({
  userName,
  level,
  role,
  email,
  phone,
  joiningDate,
  profilePicture,
  location,
  certificates,
  courses,
}) => {
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
  const [updatedUserName, setUpdatedUserName] = useState(userName);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedProfilePicture, setUpdatedProfilePicture] =
    useState(profilePicture);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const isMobile = useIsMobile();

  const handleEdit = () => setEditSidebarOpen(true);
  const handleCloseEditSidebar = () => setEditSidebarOpen(false);
  const handleSave = () => setEditSidebarOpen(false);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Box display='flex' flexDirection={isMobile ? 'column' : 'row'}>
      <Box flex={1} p={3}>
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.grey[600],
            position: 'relative',
          }}
        >
          <Button
            onClick={handleEdit}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: theme.palette.background.default,
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            <Edit />
            Edit
          </Button>
          <Grid container spacing={2} alignItems='center'>
            <Grid
              item
              xs={12}
              sm={3}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgressWithLabel
                value={75}
                profilePicture={profilePicture}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant='h5' sx={{ color: theme.palette.grey[600] }}>
                <strong>{userName}</strong>
              </Typography>
              <Typography variant='h6' sx={{ color: theme.palette.grey[600] }}>
                {level}
              </Typography>
              <Box mt={10}>
                <ProfileInfo
                  icon={<BusinessCenter sx={{ mr: 1 }} />}
                  label='Role:'
                  value={role}
                />
                <ProfileInfo
                  icon={<Mail sx={{ mr: 1 }} />}
                  label='Mail:'
                  value={email}
                />
                <ProfileInfo
                  icon={<Phone sx={{ mr: 1 }} />}
                  label='Phone:'
                  value={phone}
                />
                <ProfileInfo
                  icon={<DateRangeIcon sx={{ mr: 1 }} />}
                  label='Joining Date:'
                  value={joiningDate}
                />
                <ProfileInfo
                  icon={<LocationCityOutlined sx={{ mr: 1 }} />}
                  label='Location:'
                  value={location}
                />
              </Box>
            </Grid>
          </Grid>
          <UploadFile
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            buttonText='Upload Resume'
          />
        </Box>

        <MyCertificate certificates={certificates} />
        <Course courses={courses} />
      </Box>

      <Backdrop
        sx={{
          color: `${theme.palette.background.default}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={editSidebarOpen}
        onClick={handleCloseEditSidebar}
      >
        <Box
          p={3}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.palette.background.default,
            width: isMobile ? '100%' : '400px',
            boxShadow: 3,
            padding: '20px',
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant='h6'
            sx={{
              color: theme.palette.grey[600],
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Edit Profile
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Avatar
              src={profilePicture}
              sx={{
                width: 150,
                height: 150,
                marginBottom: 8,
              }}
            />
            <Button
              variant='contained'
              component='label'
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 200,
                zIndex: 1000,
                borderRadius: '50%',
                border: `5px solid ${theme.palette.background.default}`,
                width: 40,
                height: 40,
                minWidth: 0,
              }}
            >
              <input type='file' hidden onChange={handleProfilePictureChange} />
              <AddAPhotoRounded />
            </Button>
          </Box>

          <Button
            variant='text'
            component='label'
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Remove Picture
          </Button>
          <TextField
            label='Name'
            value={updatedUserName}
            onChange={(e) => setUpdatedUserName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Phone'
            value={updatedPhone}
            onChange={(e) => setUpdatedPhone(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Location'
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            fullWidth
            margin='normal'
          />
          <Box display='flex' justifyContent='center' mt={2}>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default ProfilePage;
