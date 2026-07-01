import express from "express";
import authRouter from "./routes/auth.routes.js";
import { connectToDatabase } from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);


connectToDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})