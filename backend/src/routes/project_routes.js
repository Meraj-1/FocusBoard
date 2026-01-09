// routes/project.routes.js
// import { authMiddleware } from "../middlewares/auth_middleware";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { projectOwnerOnly } from "../middlewares/projectOwner_middleware.js";
import { createProject, getMyProjects } from "../controllers/project_controller.js";
import { getTasks, createTask } from "../controllers/task_controller.js";
import router from "./auth_routes.js";

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);

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


export default router;