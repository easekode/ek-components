import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu as MenuComponent,
  MenuItem,
  Toolbar,
  Badge,
  Menu,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Notifications,
  Logout,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/config/appRoutes';
import {
  CustomAvatar,
  theme,
  Loading,
  ErrorDisplay,
  Logo,
  useModalManager,
} from '@ek-components';
import { IInvitation } from '@ek-types';
import { getLocalUserInfo } from '@ek-components/Auth/authToken';
import { InvitationModalContent } from './invitationModal';
import { useInvitationsQuery } from '@/redux/slices/invitation/invitationsApi';

const drawerWidth = 240;

interface DrawerItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  drawerItems: DrawerItem[];
}

export const SideMenu = ({ open, onClose, drawerItems }: SideMenuProps) => {
  const { openModal } = useModalManager();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const handleDrawerClose = () => onClose();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuClick = (path: string) => {
    handleMenuClose();
    router.push(path);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => setNotificationAnchorEl(null);

  const handleInvitationClick = () => {
    openModal(
      <InvitationModalContent
        pendingInvitations={pendingInvitations}
        refetch={refetch}
      />
    );
    handleNotificationMenuClose();
  };

  const loginUserInfo = getLocalUserInfo();

  const { data, isLoading, error, refetch } = useInvitationsQuery();

  const invitations: IInvitation[] = data?.data?.data ?? [];
  const pendingInvitations = invitations.filter(
    (invitation) => invitation.status === 'pending'
  );

  if (isLoading) return <Loading message='Loading...., please wait' />;

  if (error) return <ErrorDisplay message={error.toString()} />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerClose}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color='inherit'
              sx={{ color: theme.palette.background.paper }}
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={pendingInvitations.length} color='error'>
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              color='inherit'
              edge='end'
              onClick={handleAvatarClick}
              sx={{ marginRight: '1.5rem' }}
            >
              <CustomAvatar
                name={loginUserInfo?.profile?.name}
                profilePicture={loginUserInfo?.profile?.emailVerified}
              />
            </IconButton>
            <MenuComponent
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick(AppRoutes.PROFILE)}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick(AppRoutes.LOGIN)}>
                Logout
              </MenuItem>
            </MenuComponent>
            <Menu
              anchorEl={notificationAnchorEl}
              open={isNotificationMenuOpen}
              onClose={handleNotificationMenuClose}
            >
              {pendingInvitations.length === 0 ? (
                <MenuItem>No new notifications</MenuItem>
              ) : (
                <MenuItem onClick={handleInvitationClick}>
                  {pendingInvitations.length} new Invitation
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='persistent'
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
          <Toolbar
            sx={{ justifyContent: 'center', cursor: 'pointer' }}
            onClick={() => router.push(AppRoutes.HOME)}
          >
            <Logo src='/logov1.png' width={150} height={20} />
          </Toolbar>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <List>
            {drawerItems?.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => router.push(item.href)}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ p: 2 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push(AppRoutes.LOGIN)}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default SideMenu;
