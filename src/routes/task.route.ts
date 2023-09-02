import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

const taskController = new TaskController();

router.get("/", taskController.index());
router.post("/", taskController.store());
router.get("/:id", taskController.show());
router.put("/:id", taskController.update());
router.delete("/:id", taskController.delete());

router.post("/:id/status", taskController.changeTaskGroup());
router.post("/:id/assign", taskController.assignUser());
router.post("/:id/comment", taskController.addComment());


export default router;
