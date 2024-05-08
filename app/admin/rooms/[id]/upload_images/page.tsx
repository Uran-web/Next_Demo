import type { Metadata } from 'next';

import UploadRoomImages from '@/components/admin/UploadRoomImages';
import { getAuthHeader } from '@/helpers/authHeader';
import Error from '@/app/error';

export const metadata: Metadata = {
  title: 'Upload Room Images - Admin',
};

const getRoom = async (id: string) => {
  const req = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: {
      tags: ['RoomDetails'],
    },
  });
  return req.json();
};

const AdminUploadImagesPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getRoom(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <UploadRoomImages data={data} />;
};

export default AdminUploadImagesPage;
