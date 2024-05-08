import type { Metadata } from 'next';

import { getAuthHeader } from '@/helpers/authHeader';
import AllUsers from '@/components/admin/AllUsers';
import Error from '@/app/error';

export const metadata: Metadata = {
  title: 'All Users - Admin',
};

const getUsers = async () => {
  const authHeaders = getAuthHeader();

  const req = await fetch(`${process.env.API_URL}/api/admin/users`, {
    headers: authHeaders.headers,
  });
  return req.json();
};

const AdminBookingsPage = async () => {
  const data = await getUsers();

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <AllUsers data={data} />;
};

export default AdminBookingsPage;
