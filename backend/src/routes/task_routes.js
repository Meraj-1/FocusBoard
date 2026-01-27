import { authMiddleware } from "../middlewares/auth_middleware";
import { updateTask, deleteTask,getTasks } from "../controllers/task_controller";

// const router = express.Router();
const router = express.Router({ mergeParams: true });



router.get("/:task", authMiddleware, getTasks )
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);


// export default router