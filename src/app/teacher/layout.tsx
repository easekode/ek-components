import Layout from '../features/Layout/layout';
import React from 'react';
import { teacherDrawerItems } from '../features/Layout/drawerItems';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return <Layout menu={teacherDrawerItems}>{children}</Layout>;
};

export default LayoutComponent;
