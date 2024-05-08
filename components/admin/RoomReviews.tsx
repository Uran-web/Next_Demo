'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { MDBDataTable } from 'mdbreact';

import {
  useDeleteReviewMutation,
  useLazyGetRoomReviewsQuery,
} from '@/redux/api/roomApi';
import { IReview } from '@/backend/models/room';
import { revalidateTag } from '@/helpers/revalidate';

const RoomReviews = () => {
  const [roomId, setRoomId] = useState('');

  const router = useRouter();

  const [getRoomReviews, { data, error, isSuccess }] =
    useLazyGetRoomReviewsQuery();

  const reviews = data?.reviews || [];

  const getRoomReviewsHandler = () => {
    getRoomReviews(roomId);
  };

  const [
    deleteReview,
    {
      isLoading: isDeleteLoading,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isDeleteSuccess) {
      revalidateTag('RoomDetails');
      router.refresh();
      toast.success('User deleted');
    }
  }, [error, isDeleteSuccess]);

  const deleteReviewHandler = (id: string) => {
    deleteReview({ id: id, roomId });
  };

  const setReviews = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Rating', field: 'rating', sort: 'asc' },
        { label: 'Comment', field: 'comment', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    reviews?.forEach((review: IReview) => {
      data?.rows?.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        actions: (
          <React.Fragment key={review?._id}>
            <button
              className="btn btn-outline-danger mx-2"
              disabled={isDeleteLoading}
              onClick={() => deleteReviewHandler(review?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </React.Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <div className="form-check">
            <label htmlFor="roomId_field">Enter Room ID</label>
            <input
              type="text"
              id="roomId_field"
              className="form-control"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />

            <button
              className="btn form-btn w-100 py-2 mt-3"
              onClick={getRoomReviewsHandler}
            >
              Fetch Reviews
            </button>
          </div>
        </div>
      </div>

      {!!reviews?.length ? (
        <MDBDataTable
          data={setReviews()}
          className={'px-3'}
          bordered
          striped
          hover
        />
      ) : (
        <h5 className="mt-5 text-center">No Reviews</h5>
      )}
    </div>
  );
};

export default RoomReviews;
