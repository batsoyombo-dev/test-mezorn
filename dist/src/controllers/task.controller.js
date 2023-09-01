"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskController {
    index(req, res) {
        // Return list of tasks
        return res.json({
            data: [],
            success: true,
        });
    }
}
exports.default = TaskController;
