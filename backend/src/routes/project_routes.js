// routes/project.routes.js
// import { authMiddleware } from "../middlewares/auth_middleware";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { projectOwnerOnly } from "../middlewares/projectOwner_middleware.js";
import { createProject, getMyProjects, editProject, deleteProject } from "../controllers/project_controller.js";
import { getTasks, createTask,updateTask, deleteTask } from "../controllers/task_controller.js";
import router from "./auth_routes.js";
import { upload } from "../middlewares/upload.js";

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);
router.put("/:projectId", authMiddleware, projectOwnerOnly, editProject);
router.delete("/:projectId", authMiddleware, projectOwnerOnly, deleteProject);


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