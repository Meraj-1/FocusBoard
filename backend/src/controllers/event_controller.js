// event_controller.js
import { AuthEvents } from "auth-events";
import AuthLog from "../models/authlog_model.js";

const authEvent = new AuthEvents();

// Signup event
authEvent.on("signup", async (event) => {
  try {
    console.log("SIGNUP EVENT RECEIVED:", event);
    await AuthLog.create({
      userId: event.userId,
      type: "signup",
      ip: event.ip,
      userAgent: event.userAgent,
      timestamp: event.timestamp,
    });
    console.log(`[SIGNUP EVENT saved for user ${event.userId}]`);
  } catch (err) {
    console.error("Failed to save signup event:", err.message);
  }
});

// Login event
authEvent.on("login", async (event) => {
  try {
    console.log("LOGIN EVENT RECEIVED:", event);
    await AuthLog.create({
      userId: event.userId,
      type: "login",
      ip: event.ip,
      userAgent: event.userAgent,
      timestamp: event.timestamp,
    });
    console.log(`[LOGIN EVENT saved for user ${event.userId}]`);
  } catch (err) {
    console.error("Failed to save login event:", err.message);
  }
});

// Logout event
authEvent.on("logout", async (event) => {
  try {
    console.log("LOGOUT EVENT RECEIVED:", event);
    await AuthLog.create({
      userId: event.userId,
      type: "logout",
      ip: event.ip,
      userAgent: event.userAgent,
      timestamp: event.timestamp,
    });
    console.log(`[LOGOUT EVENT saved for user ${event.userId}]`);
  } catch (err) {
    console.error("Failed to save logout event:", err.message);
  }
});

export default authEvent;
