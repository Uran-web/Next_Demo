import type { Metadata } from 'next';

import Error from '@/app/error';
import RoomDetails from '@/components/room/RoomDetails';

interface Props {
  params: {
    id: string;
  };
}

const getRoom = async (id: string) => {
  const req = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: { tags: ['RoomDetails'] },
  });
  return req.json();
};

const RoomDetailsPage = async ({ params }: Props) => {
  const data = await getRoom(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <RoomDetails data={data} />;
};

export default RoomDetailsPage;

export async function generateMetadata({ params }: Props) {
  const data = await getRoom(params?.id);

  return {
    title: data?.room?.name,
  };
}
