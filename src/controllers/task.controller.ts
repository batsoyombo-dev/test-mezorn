import { Request, Response, response } from "express";
import { TaskService } from "../services";
import { JSONSchemaType } from "ajv";
import ajv from "../utils/ajv";
import { DEMO_AUTHENTICATED_USER } from "../../config";

class TaskController {
    service: TaskService;

    constructor() {
        this.service = new TaskService();
    }

    /**
     * Get all tasks
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    index() {
        return (req: Request, res: Response) => {
            const tasks = this.service.getTasks();

            return res.json({
                data: tasks,
                success: true,
            });
        };
    }

    /**
     * Create new task
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    store() {
        const schema: JSONSchemaType<{
            title: string;
            description: string;
            group_id: number;
        }> = {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                group_id: { type: "number" },
            },
            required: ["title", "description", "group_id"],
            additionalProperties: false,
        };

        const validator = ajv.compile(schema);

        return (req: Request, res: Response) => {
            const payload = req.body as {
                title: string;
                description: string;
                group_id: number;
            };

            if (!validator(payload)) throw new Error("Invalid data!");

            this.service.createTask(payload);
            return res.json({
                success: true,
            });
        };
    }

    /**
     * Show task detail
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    show() {
        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            return res.json({
                data: task,
                success: true,
            });
        };
    }

    /**
     * Update task
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    update() {
        const schema: JSONSchemaType<{
            title: string;
            description: string;
        }> = {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
            },
            required: ["title", "description"],
            additionalProperties: false,
        };

        const validator = ajv.compile(schema);

        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            const payload = req.body as {
                title: string;
                description: string;
            };

            if (!validator(payload)) throw new Error("Invalid data!");

            this.service.updateTask(task, payload);

            return res.json({
                success: true,
            });
        };
    }

    /**
     * Delete task
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    delete() {
        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            this.service.deleteTask(task);

            return res.json({
                success: true,
            });
        };
    }

    changeTaskGroup() {
        const schema: JSONSchemaType<{
            group_id: number;
        }> = {
            type: "object",
            properties: {
                group_id: { type: "number" },
            },
            required: ["group_id"],
            additionalProperties: false,
        };

        const validator = ajv.compile(schema);

        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            const payload = req.body as {
                group_id: number;
            };

            if (!validator(payload)) throw new Error("Invalid data!");

            this.service.changeTaskGroup(task, payload.group_id);

            return res.json({
                success: true,
            });
        };
    }

    addComment() {
        const schema: JSONSchemaType<{
            body: string;
        }> = {
            type: "object",
            properties: {
                body: { type: "string" },
            },
            required: ["body"],
            additionalProperties: false,
        };

        const validator = ajv.compile(schema);

        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            const payload = req.body as {
                body: string;
            };

            if (!validator(payload)) throw new Error("Invalid data!");

            this.service.addComment(
                DEMO_AUTHENTICATED_USER.id,
                task.id,
                payload
            );

            return res.json({
                success: true,
            });
        };
    }

    assignUser() {
        const schema: JSONSchemaType<{
            user_id: number;
        }> = {
            type: "object",
            properties: {
                user_id: { type: "number" },
            },
            required: ["user_id"],
            additionalProperties: false,
        };

        const validator = ajv.compile(schema);

        return (req: Request<{ id: string }>, res: Response) => {
            const taskId = parseInt(req.params.id);

            const task = this.service.findTask(taskId);
            if (task === undefined) throw new Error("Not found!");

            const payload = req.body as {
                user_id: string;
            };

            if (!validator(payload)) throw new Error("Invalid data!");

            this.service.assignTask(task.id, DEMO_AUTHENTICATED_USER.id);

            return res.json({
                success: true,
            });
        };
    }
}

export default TaskController;
