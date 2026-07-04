import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function registerUserController(req: { body: { username: string; email: string; password: string; }; }, res: any) {
  const { username, email, password } = req.body;

  const isExistingUser = await User.findOne({ $or: [{ username }, { email }] });

  if(isExistingUser) {
    return res.status(422).json({ message: "Username or email already exists", status: "failed"});
  }
  const user = await userModel.create({ username, email, password });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });
  res.status(201).json({ message: "User registered successfully", status: "success", token });
}

export { registerUserController };