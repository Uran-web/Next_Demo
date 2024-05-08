import type { Metadata } from 'next';

import Error from '@/app/error';
import UpdateUser from '@/components/admin/UpdateUser';
import { getAuthHeader } from '@/helpers/authHeader';

export const metadata: Metadata = {
  title: 'Update Users - Admin',
};

interface Props {
  params: {
    id: string;
  };
}

const getUser = async (id: string) => {
  const authHeader = getAuthHeader();

  const req = await fetch(
    `${process.env.API_URL}/api/admin/users/${id}`,
    authHeader
  );
  return req.json();
};

const AdminUserPage = async ({ params }: Props) => {
  const data = await getUser(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UpdateUser data={data} />;
};

export default AdminUserPage;
