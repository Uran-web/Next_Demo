import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI: string = "";

  // ON the dev environment use local db resource
  if (process.env.NODE_ENV === "development")
    DB_URI = process.env.DB_LOCAL_URI!;

  if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;

  await mongoose.connect(DB_URI).then((conn) => console.log("DB Connected"));
};

export default dbConnect;
