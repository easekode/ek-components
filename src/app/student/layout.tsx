import Layout from '../features/Layout/layout';
import React from 'react';
import {
  studentDrawerItems,
  teacherDrawerItems,
} from '../features/Layout/drawerItems';

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return <Layout menu={studentDrawerItems}>{children}</Layout>;
};

export default LayoutComponent;
