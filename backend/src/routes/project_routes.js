// routes/project.routes.js
// import { authMiddleware } from "../middlewares/auth_middleware";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { projectOwnerOnly } from "../middlewares/projectOwner_middleware.js";
import { createProject, getMyProjects, editProject, deleteProject } from "../controllers/project_controller.js";
import { getTasks, createTask,updateTask, deleteTask } from "../controllers/task_controller.js";
// import router from "./auth_routes.js";
import { upload } from "../middlewares/upload.js";

import express from "express";
const router = express.Router();


router.post("/create", authMiddleware, upload.single("logo"),  createProject);
router.get("/read", authMiddleware, getMyProjects);
router.put("/:projectId/update", authMiddleware, projectOwnerOnly, editProject);
router.delete("/:projectId/delete", authMiddleware, projectOwnerOnly, deleteProject);



router.get(
  "/:projectId/tasks",
  authMiddleware,
  upload.single("logo"),
  projectOwnerOnly,
  getTasks
);

router.post(
  "/:projectId/tasks",
  authMiddleware,
  projectOwnerOnly,
  createTask
);


export default router;