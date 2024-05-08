import type { Metadata } from 'next';

import AllRooms from '@/components/admin/AllRooms';
import { getAuthHeader } from '@/helpers/authHeader';
import Error from '@/app/error';

export const metadata: Metadata = {
  title: 'All Rooms - Admin',
};

const getRooms = async () => {
  const authHeaders = getAuthHeader();

  const req = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeaders.headers,
  });
  return req.json();
};

const AdminRoomsPage = async () => {
  const data = await getRooms();

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <AllRooms data={data} />;
};

export default AdminRoomsPage;
