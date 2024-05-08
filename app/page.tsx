import type { Metadata } from 'next';

import Home from '@/components/Home';
import Error from './error';

export const metadata: Metadata = {
  title: 'Home Page - Book It',
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const req = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: 'no-cache',
  });
  return req.json();
};

const HomePage = async ({ searchParams }: { searchParams: string }) => {
  const data = await getRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }
  return <Home data={data} />;
};

export default HomePage;
