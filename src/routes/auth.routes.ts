import express from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const router = express.Router();

//POST /api/auth/register
router.post("/register", (req, res) => {
  registerUserController(req, res);
});

router.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("User logged in successfully");
});

export default router;

