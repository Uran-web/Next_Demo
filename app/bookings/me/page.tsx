import type { Metadata } from 'next';

import MyBookings from '@/components/booking/MyBookings';
import Error from '@/app/error';
import { getAuthHeader } from '@/helpers/authHeader';

export const metadata: Metadata = {
  title: 'My Bookings',
};

const getBookings = async () => {
  const authHeader = getAuthHeader();

  const req = await fetch(`${process.env.API_URL}/api/bookings/me`, authHeader);
  return req.json();
};

const MyBookingsPage = async () => {
  const data = await getBookings();

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <MyBookings data={data} />;
};

export default MyBookingsPage;
