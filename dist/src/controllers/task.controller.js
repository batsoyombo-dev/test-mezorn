"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class TaskController {
    constructor() {
        this.service = new services_1.TaskService();
    }
    /**
     * Get all user tasks
     *
     * @param req Request
     * @param res Response
     * @returns Response
     */
    index(req, res) {
        const tasks = this.service.getTasks();
        // Return list of tasks
        return res.json({
            data: tasks,
            success: true,
        });
    }
}
exports.default = TaskController;
