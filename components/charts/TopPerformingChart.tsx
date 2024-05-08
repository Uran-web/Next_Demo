import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface Room {
  roomName: string;
  bookingsCount: string;
}

interface Props {
  rooms: Room[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const TopPerformingChart = ({ rooms }: Props) => {
  const roomsName = rooms?.map((room) => room?.roomName);
  const roomsBooking = rooms?.map((room) => room?.bookingsCount);

  const data = {
    labels: roomsName,
    datasets: [
      {
        label: '# of Bookings',
        data: roomsBooking,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default TopPerformingChart;
