'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { IRoom } from '@/backend/models/room';
import {
  useLazyCheckBookingAvailabilityQuery,
  useNewBookingMutation,
  useGetBookedDatesQuery,
  useLazyStripeCheckoutQuery,
} from '@/redux/api/bookingApi';
import { calculateDaysOfStay } from '@/helpers/helpers';
import { useAppSelector } from '@/redux/hooks';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  room: IRoom;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [newBooking] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();

  const isAvailable = data?.isAvailable;

  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room._id
  );

  const exclude = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);

      setDaysOfStay(days);

      checkBookingAvailability({
        id: room?._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
    }
  };

  const [stripeCheckout, { isLoading, error, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error?.data?.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData?.session?.url);
    }
  }, [error, checkoutData]);

  const bookRoom = () => {
    const amount = room.pricePerNight * daysOfStay;

    const checkoutData = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      daysOfStay,
      amount,
    };

    stripeCheckout({ id: room?._id, checkoutData });
  };

  // const bookRoom = () => {
  //   const bookingData = {
  //     room: room?._id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay,
  //     amountPaid: room.pricePerNight * daysOfStay,
  //     paymentInfo: {
  //       id: 'STRIPE_ID',
  //       status: 'PAID',
  //     },
  //   };
  //   newBooking(bookingData);
  // };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>{`${room?.pricePerNight}`}</b> / night
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
      <DatePicker
        className={'w-100'}
        selected={checkInDate}
        popperClassName={'z-2'}
        onChange={onChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        excludeDates={exclude}
        selectsRange
        inline
      />
      {isAvailable && (
        <div className="alert alert-success my-3">
          Room is available. Book now.
        </div>
      )}{' '}
      {!isAvailable && (
        <div className="alert alert-danger my-3">
          Room not available. Try different dates.
        </div>
      )}
      {isAvailable && !isAuthenticated && (
        <div className="alert alert-danger my-3">Login to book room.</div>
      )}
      {isAvailable && isAuthenticated && (
        <button
          className="btn py-3 form-btn w-100"
          onClick={bookRoom}
          disabled={isLoading}
        >
          Pay - ${daysOfStay * room?.pricePerNight}
        </button>
      )}
    </div>
  );
};

export default BookingDatePicker;
