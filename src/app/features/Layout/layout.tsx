'use client';
import { Box } from '@mui/material';
import { SideMenu } from '../../teacher/sideMenu/index';
import { useState } from 'react';

const drawerWidth = 240;

interface DrawerItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface LayoutProps {
  children?: React.ReactNode;
  menu?: DrawerItem[];
}

const Layout = ({ children, menu }: LayoutProps) => {
  const [open, setOpen] = useState(false);

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: open ? `${drawerWidth}px` : '0px',
        transition: 'margin-left 0.3s ease',
        padding: 3,
      }}
    >
      <SideMenu
        open={open}
        onClose={handleSidebarToggle}
        drawerItems={menu || []}
      />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
