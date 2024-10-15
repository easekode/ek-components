'use client';
import ProfilePage from '../features/students/ProfilePage';
import { profileData } from '../features/students/ProfilePage/data';

const MyProfilePage = () => {
  return <ProfilePage {...profileData} />;
};

export default MyProfilePage;
