import type { Metadata } from 'next';

import UpdateRoom from '@/components/admin/UpdateRoom';
import { getAuthHeader } from '@/helpers/authHeader';
import Error from '@/app/error';

export const metadata: Metadata = {
  title: 'Update Room - Admin',
};

const getRoom = async (id: string) => {
  const authHeaders = getAuthHeader();

  const req = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    headers: authHeaders.headers,
  });
  return req.json();
};

const AdminUpdateRoomPage = async ({ params }: { params: { id: string } }) => {
  const data = await getRoom(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <UpdateRoom data={data} />;
};

export default AdminUpdateRoomPage;
