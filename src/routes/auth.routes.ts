import express from "express";
import { loginUserController, registerUserController } from "../controllers/auth.controller.js";

const router = express.Router();

//Handle user registration
//POST /api/auth/register
router.post("/register", (req, res) => {
  registerUserController(req, res);
});

//POST /api/auth/login
router.post("/login", (req, res) => {
  // Handle user login logic here
  loginUserController(req, res);
});

export default router;

