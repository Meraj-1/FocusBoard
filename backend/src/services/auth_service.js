import bcrypt from "bcrypt";
import User from "../models/user_model.js";
import { generateToken } from "../utils/generateToken.js";
import mongoose from "mongoose";

export const signupService = async ({ name, email, password }) => {
  mongoose.connect(process.env.MONGODB_URI);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken({ id: user._id });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  };
};
