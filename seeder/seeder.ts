import Room from '../backend/models/room';
import mongoose from 'mongoose';
import { rooms } from './data';
require('dotenv').config({ path: 'next.config.js' });

const seedRooms = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sashamakogon94:AUI2YseTcR2GUb27@bookit.p3ayzy2.mongodb.net/bookit?retryWrites=true&w=majority&appName=bookit'
    );

    await Room.deleteMany();
    console.log('Rooms are deleted');

    await Room.insertMany(rooms);
    console.log('Rooms are inserted');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
