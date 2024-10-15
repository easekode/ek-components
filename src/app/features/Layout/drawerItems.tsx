import {
  HistoryEdu,
  PendingActions,
  FolderShared,
  Mail,
  AccountCircle,
  Settings,
} from '@mui/icons-material';
import { AppRoutes } from '@/config/appRoutes';
import Groups2Icon from '@mui/icons-material/Groups2';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HomeIcon from '@mui/icons-material/Home';

export const teacherDrawerItems = [
  {
    title: 'My Courses',
    icon: <HistoryEdu />,
    href: AppRoutes.TEACHER_COURSES,
  },
  {
    title: 'My Session',
    icon: <PendingActions />,
    href: AppRoutes.TEACHER_SESSION,
  },
  {
    title: 'My Batches',
    icon: <FolderShared />,
    href: AppRoutes.TEACHER_BATCHES,
  },
  { title: 'Chat', icon: <Mail />, href: AppRoutes.TEACHER_CHAT },
  {
    title: 'Profile',
    icon: <AccountCircle />,
    href: AppRoutes.PROFILE,
  },
  {
    title: 'Settings',
    icon: <Settings />,
    href: AppRoutes.TEACHER_SETTINGS,
  },
];

export const studentDrawerItems = [
  {
    title: 'My Courses',
    icon: <HistoryEdu />,
    href: AppRoutes.STUDENT_COURSES,
  },
  {
    title: 'My Session',
    icon: <PendingActions />,
    href: AppRoutes.STUDENT_SESSION,
  },
  {
    title: 'My Classes',
    icon: <FolderShared />,
    href: AppRoutes.STUDENT_CLASSES,
  },
  { title: 'Chat', icon: <Mail />, href: AppRoutes.TEACHER_CHAT },
  {
    title: 'Profile',
    icon: <AccountCircle />,
    href: AppRoutes.PROFILE,
  },
  {
    title: 'Settings',
    icon: <Settings />,
    href: AppRoutes.STUDENT_SETTINGS,
  },
];

export const adminDrawerItems = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    href: AppRoutes.ADMIN_TEACHERS,
  },
  {
    title: 'Teachers',
    icon: <SupervisorAccountIcon />,
    href: AppRoutes.ADMIN_TEACHERS,
  },
  {
    title: 'Students',
    icon: <Groups2Icon />,
    href: AppRoutes.ADMIN_STUDENTS,
  },
  {
    title: 'Courses',
    icon: <FolderShared />,
    href: AppRoutes.ALL_COURSES,
  },
  {
    title: 'Profile',
    icon: <AccountCircle />,
    href: AppRoutes.PROFILE,
  },
  {
    title: 'Settings',
    icon: <Settings />,
    href: AppRoutes.TEACHER_SETTINGS,
  },
];
