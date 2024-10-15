import { adminDrawerItems } from '@/app/features/Layout/drawerItems';
import Layout from '@/app/features/Layout/layout';
import React from 'react';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return <Layout menu={adminDrawerItems}>{children}</Layout>;
};

export default LayoutComponent;
