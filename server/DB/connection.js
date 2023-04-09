import mongoose from "mongoose";
import { MONGO_DB_URI } from "../config/index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected : ${conn.connection.host}`.info);
  } catch (error) {
    console.log(`Error : ${error.message}`.error);
    process.exit();
  }
};

export { connectDB };
