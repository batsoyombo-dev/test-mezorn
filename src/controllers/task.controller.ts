import { Request, Response } from "express";

class TaskController {
    index(req: Request, res: Response) {
        // Return list of tasks
        return res.json({
            data: [],
            success: true,
        });
    }
}

export default TaskController;
