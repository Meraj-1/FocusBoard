import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import projectRoutes from "./routes/project_routes.js";

const app = express();
app.use(express.json()); // ⭐ THIS IS MUST
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://focus-board-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
