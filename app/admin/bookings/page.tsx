import type { Metadata } from 'next';

import AllBookings from '@/components/admin/AllBookings';
import { getAuthHeader } from '@/helpers/authHeader';
import Error from '@/app/error';

export const metadata: Metadata = {
  title: 'All Bookings - Admin',
};

const getBookings = async () => {
  const authHeaders = getAuthHeader();

  const req = await fetch(`${process.env.API_URL}/api/admin/bookings`, {
    headers: authHeaders.headers,
  });
  return req.json();
};

const AdminBookingsPage = async () => {
  const data = await getBookings();

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <AllBookings data={data} />;
};

export default AdminBookingsPage;
