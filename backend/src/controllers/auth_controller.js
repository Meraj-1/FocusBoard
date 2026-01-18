// controllers/auth_controller.js
import { signupService, loginService } from "../services/auth_service.js";
import authEvent from "./event_controller.js";

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const data = await signupService(req.body);

    // Ensure userId is correct
    const userId = data.user._id || data.user.id;
    console.log("EMIT SIGNUP for user:", userId);

    // Emit signup event
    authEvent.emit("signup", {
      userId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp: new Date(),
    });

    // Auto-login after signup
    authEvent.emit("login", {
      userId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp: new Date(),
    });

    // Respond with user + token
    res.status(201).json(data);
  } catch (error) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const data = await loginService(req.body);

    // Ensure userId is correct
    const userId = data.user._id || data.user.id;
    console.log("EMIT LOGIN for user:", userId);

    authEvent.emit("login", {
      userId,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp: new Date(),
    });

    res.json(data);
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    next(error);
  }
};

// LOGOUT
export const logout = async (req, res) => {
  // If JWT based, frontend deletes token; we just record the event
  const userId = req.user?._id || req.user?.id || null;
  console.log("EMIT LOGOUT for user:", userId);

  authEvent.emit("logout", {
    userId,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    timestamp: new Date(),
  });

  res.json({ message: "Logged out successfully" });
};
