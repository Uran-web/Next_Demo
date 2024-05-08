import React from 'react';
import type { Metadata } from 'next';

import Dashboard from '@/components/admin/Dashboard';

export const metadata: Metadata = {
  title: 'Dashboard- Admin',
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
