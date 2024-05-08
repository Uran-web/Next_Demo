import React from 'react';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';

import { IReview } from '@/backend/models/room';

interface Props {
  reviews: IReview[];
}

const ListReviews = ({ reviews }: Props) => {
  return (
    <div className="reviews w-75 mb-5">
      <h3>{reviews?.length} Reviews</h3>
      <hr />

      {reviews?.map((review) => {
        return (
          <div className="review-card my-3">
            <div className="row">
              <div className="col-3 col-lg-1">
                <Image
                  src={review?.user?.avatar?.url || '/images/avatar.jpg'}
                  alt={review?.user?.name}
                  width={60}
                  height={60}
                  className="rounded-circle"
                />
              </div>
              <div className="col-9 col-lg-11">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#e61e4d"
                  starDimension={'24px'}
                  starSpacing={'1px'}
                  numberOfStars={5}
                  name="rating"
                />
                <p className="review_user mt-1">by {review?.user?.name}</p>
                <p className="review_comment">{review?.comment}</p>
              </div>
              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListReviews;
