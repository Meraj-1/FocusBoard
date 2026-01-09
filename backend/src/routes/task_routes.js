import { authMiddleware } from "../middlewares/auth_middleware";
import { updateTask, deleteTask } from "../controllers/task_controller";


router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);
