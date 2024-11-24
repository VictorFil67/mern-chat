import mongoose from "mongoose";
import "dotenv/config";

const { DB_HOST } = process.env;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Error connection to MongoDb ", error.message);
    process.exit(1);
  }
};
export default connectToMongoDB;
