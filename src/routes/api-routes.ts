import { Router } from "express";
import { default as taskRouter } from "./task.route";

const mainRouter = Router();

mainRouter.use("/api/task", taskRouter);

export default mainRouter;
