import type { Metadata } from 'next';

import RoomReviews from '@/components/admin/RoomReviews';

export const metadata: Metadata = {
  title: 'Room Reviews - Admin',
};

const AdminRoomsReviewsPage = async () => {
  return <RoomReviews />;
};

export default AdminRoomsReviewsPage;
