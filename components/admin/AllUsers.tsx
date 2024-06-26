'use client';

import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { IUser } from '@/backend/models/user';
import { useDeleteUserMutation } from '@/redux/api/userApi';

interface Props {
  data: {
    users: IUser[];
  };
}

// TODO: AllBookings and MyBookings use the same component
// I should create reusable component for these both pages

const AllUsers = ({ data }: Props) => {
  const users = data?.users;

  const router = useRouter();

  const [deleteUser, { isLoading, isSuccess, error }] = useDeleteUserMutation();

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success('User deleted');
    }
  }, [error, isSuccess]);

  const deleteUserHandler = (id: string) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Role', field: 'role', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    users?.forEach((user) => {
      data?.rows?.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link
              href={`/admin/users/${user._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger mx-2"
              disabled={isLoading}
              onClick={() => deleteUserHandler(user?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <div className="container">
      <h1 className="my-5">{users?.length} Bookings</h1>
      <MDBDataTable
        data={setUsers()}
        className={'px-3'}
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllUsers;
