import type { Metadata } from 'next';

import NewRoom from '@/components/admin/NewRoom';

export const metadata: Metadata = {
  title: 'New Room - Admin',
};

const NewRoomPage = async () => {
  return <NewRoom />;
};

export default NewRoomPage;
