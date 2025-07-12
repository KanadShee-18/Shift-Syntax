import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connected Successfully !!!"))
    .catch((err) => {
      console.log("Error while connecting to DB");
      console.log("-----------------DB Error------------- ", err);
      process.exit(1);
    });
};
