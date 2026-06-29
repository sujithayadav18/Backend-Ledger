import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

export function connectToDatabase() {
  const uri = getEnv("MONGODB_URI");
  const username = getEnv("MONGODB_USERNAME");
  const password = getEnv("MONGODB_PASSWORD");

  mongoose.connect(uri, {
    auth: {
      username: username,
      password: password
    }
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}