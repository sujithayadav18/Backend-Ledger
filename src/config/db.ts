import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//fetch Value for the given environment variable name
function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

//connecting to DB
export function connectToDatabase() {
  const uri = getEnv("MONGODB_URI");

  mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}