import React from 'react';

import NewPassword from '@/components/user/NewPassword';

export const metadata = {
  title: 'Reset Password',
};

interface Props {
  params: {
    token: string;
  };
}

const NewPasswordPage = ({ params }: Props) => {
  return (
    <div>
      <NewPassword token={params.token} />
    </div>
  );
};

export default NewPasswordPage;
