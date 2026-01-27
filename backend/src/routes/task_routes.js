import { authMiddleware } from "../middlewares/auth_middleware";
import { updateTask, deleteTask,getTasks } from "../controllers/task_controller";


router.get("/:task", authMiddleware, getTasks )
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);
