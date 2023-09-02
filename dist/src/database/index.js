"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_COMMENTS = exports.TASKS = exports.GROUPS = exports.TASK_ASSIGNEES = exports.USERS = void 0;
const users_json_1 = __importDefault(require("../_mock/users.json"));
const tasks_json_1 = __importDefault(require("../_mock/tasks.json"));
const task_assignees_json_1 = __importDefault(require("../_mock/task_assignees.json"));
const groups_json_1 = __importDefault(require("../_mock/groups.json"));
const task_comments_json_1 = __importDefault(require("../_mock/task_comments.json"));
exports.USERS = users_json_1.default;
exports.TASK_ASSIGNEES = task_assignees_json_1.default;
exports.GROUPS = groups_json_1.default;
exports.TASKS = tasks_json_1.default;
exports.TASK_COMMENTS = task_comments_json_1.default;
