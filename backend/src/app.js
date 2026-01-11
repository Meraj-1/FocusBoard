import express from "express";
import authRoutes from "./routes/auth_routes.js";
import projectRoutes from "./routes/project_routes.js" 
const app = express();
app.use(express.json());
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes)

export default app;
