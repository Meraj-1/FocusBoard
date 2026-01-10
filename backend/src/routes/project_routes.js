// routes/project.routes.js
// import { authMiddleware } from "../middlewares/auth_middleware";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { projectOwnerOnly } from "../middlewares/projectOwner_middleware.js";
import { createProject, getMyProjects, editProject, deleteProject } from "../controllers/project_controller.js";
import { getTasks, createTask, editTask, deleteTask } from "../controllers/task_controller.js";
import router from "./auth_routes.js";

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);
router.put("/:projectId", authMiddleware, projectOwnerOnly, editProject);
router.delete("/:projectId", authMiddleware, projectOwnerOnly, deleteProject);


router.get(
  "/:projectId/tasks",
  authMiddleware,
  projectOwnerOnly,
  getTasks
);

router.post(
  "/:projectId/tasks",
  authMiddleware,
  projectOwnerOnly,
  createTask
);

router.put(
  "/:projectId/tasks/:taskId",
  authMiddleware,
  projectOwnerOnly,
  editTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  authMiddleware,
  projectOwnerOnly,
  deleteTask
);


export default router;