import { signupService, loginService } from "../services/auth_service.js";

export const signup = async (req, res, next) => {
  try {
    const data = await signupService(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    res.json(data);
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    next(error);
  }
};

export const logout = async (req, res) => {
  // JWT based logout = frontend token delete
  res.json({ message: "Logged out successfully" });
};
