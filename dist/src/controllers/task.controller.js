"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const ajv_1 = __importDefault(require("../utils/ajv"));
const config_1 = require("../../config");
class TaskController {
    constructor() {
        this.service = new services_1.TaskService();
    }
    /**
     * Get all tasks
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    index() {
        return (req, res) => {
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
        const schema = {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                group_id: { type: "number" },
            },
            required: ["title", "description", "group_id"],
            additionalProperties: false,
        };
        const validator = ajv_1.default.compile(schema);
        return (req, res) => {
            const payload = req.body;
            if (!validator(payload))
                throw new Error("Invalid data!");
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
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
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
        const schema = {
            type: "object",
            properties: {
                title: { type: "string" },
                description: { type: "string" },
            },
            required: ["title", "description"],
            additionalProperties: false,
        };
        const validator = ajv_1.default.compile(schema);
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
            const payload = req.body;
            if (!validator(payload))
                throw new Error("Invalid data!");
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
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
            this.service.deleteTask(task);
            return res.json({
                success: true,
            });
        };
    }
    changeTaskGroup() {
        const schema = {
            type: "object",
            properties: {
                group_id: { type: "number" },
            },
            required: ["group_id"],
            additionalProperties: false,
        };
        const validator = ajv_1.default.compile(schema);
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
            const payload = req.body;
            if (!validator(payload))
                throw new Error("Invalid data!");
            this.service.changeTaskGroup(task, payload.group_id);
            return res.json({
                success: true,
            });
        };
    }
    addComment() {
        const schema = {
            type: "object",
            properties: {
                body: { type: "string" },
            },
            required: ["body"],
            additionalProperties: false,
        };
        const validator = ajv_1.default.compile(schema);
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
            const payload = req.body;
            if (!validator(payload))
                throw new Error("Invalid data!");
            this.service.addComment(config_1.DEMO_AUTHENTICATED_USER.id, task.id, payload);
            return res.json({
                success: true,
            });
        };
    }
    assignUser() {
        const schema = {
            type: "object",
            properties: {
                user_id: { type: "number" },
            },
            required: ["user_id"],
            additionalProperties: false,
        };
        const validator = ajv_1.default.compile(schema);
        return (req, res) => {
            const taskId = parseInt(req.params.id);
            const task = this.service.findTask(taskId);
            if (task === undefined)
                throw new Error("Not found!");
            const payload = req.body;
            if (!validator(payload))
                throw new Error("Invalid data!");
            this.service.assignTask(task.id, config_1.DEMO_AUTHENTICATED_USER.id);
            return res.json({
                success: true,
            });
        };
    }
}
exports.default = TaskController;
