'use client';

import { IRoom } from '@/backend/models/room';
import StarRatings from 'react-star-ratings';

import RoomImageSlider from './RoomImageSlider';
import RoomFeatures from './RoomFeatures';
import BookingDatePicker from './BookingDatePicker';
import NewReview from '../reviews/NewReview';
import ListReviews from '../reviews/ListReviews';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});

interface Props {
  data: {
    room: IRoom;
  };
}

const RoomDetails = ({ data }: Props) => {
  const { room } = data;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>

      <div className="ratings mt-auto mb-3">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#e61e4d"
          starDimension={'22px'}
          starSpacing={'1px'}
          numberOfStars={5}
          name="rating"
        />
        <span className="no-of-reviews">{room?.numOfReviews}</span>
      </div>

      <RoomImageSlider images={room?.images} />

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room?.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
          {room?.location && (
            <div className="my-5">
              <h4 className="my-2">Room Location</h4>
              <div className="shadow rounded">
                <Map coordinates={room?.location?.coordinates} />
              </div>
            </div>
          )}
        </div>
      </div>

      <NewReview roomId={room?._id} />
      <ListReviews reviews={room?.reviews} />
    </div>
  );
};

export default RoomDetails;
