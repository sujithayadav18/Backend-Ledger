import express from "express";

const app = express();
import { connectToDatabase } from "./config/db.js";

connectToDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})