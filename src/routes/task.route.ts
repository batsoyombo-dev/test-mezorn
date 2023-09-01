import { Router } from "express";
import { TaskController } from "../controllers";

const router = Router();

const taskController = new TaskController();

router.get("/", taskController.index);

export default router;
