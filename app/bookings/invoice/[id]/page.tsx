import type { Metadata } from 'next';

import Error from '@/app/error';
import { getAuthHeader } from '@/helpers/authHeader';
import Invoice from '@/components/invoce/Invoice';

export const metadata: Metadata = {
  title: 'Booking Invoice',
};

const getBooking = async (id: string) => {
  const authHeader = getAuthHeader();

  const req = await fetch(
    `${process.env.API_URL}/api/bookings/${id}`,
    authHeader
  );
  return req.json();
};

const MyBookingsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getBooking(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <Invoice data={data} />;
};

export default MyBookingsPage;
