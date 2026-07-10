import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"


//User registration controller
async function registerUserController(req: { body: { username: string; email: string; password: string; }; }, res: any) {
  const { username, email, password } = req.body;

  const isExistingUser = await User.findOne({ $or: [{ username }, { email }] });

  if(isExistingUser) {
    return res.status(422).json({ message: "Username or email already exists", status: "failed"});
  }
  const user = await userModel.create({ username, email, password });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });
  res.cookie("token", token);
  res.status(201).json({ 
    user:{
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
    "message": "User registered successfully"
  });
}

//User login controller

async function loginUserController(req: { body: { email: string; password: string; }; }, res: any) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password", status: "failed" });
  }

  const isMatch = await (user as any).comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password", status: "failed" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "3d" });
  res.cookie("token", token);
  res.status(200).json({ 
    user:{
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
    "message": "User logged in successfully"
  });
}

export { registerUserController, loginUserController };