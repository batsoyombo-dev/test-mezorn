import { Request, Response } from "express";
import { TaskService } from "../services";

class TaskController {
    service: TaskService;

    constructor() {
        this.service = new TaskService();
    }

    /**
     * Get all user tasks
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    index(req: Request, res: Response) {
        const tasks = this.service.getTasks();

        // Return list of tasks
        return res.json({
            data: tasks,
            success: true,
        });
    }
}

export default TaskController;
