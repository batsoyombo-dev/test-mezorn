"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class TaskService {
    /**
     * Get all tasks
     *
     * @returns Task[]
     */
    getTasks() {
        return database_1.TASKS;
    }
    /**
     * Get user assigned tasks
     *
     * @param user User
     * @returns Task[]
     */
    getUserTasks(user) {
        return database_1.TASK_ASSIGNEES.filter((taskAssignee) => taskAssignee.user_id === user.id);
    }
    /**
     * Create task
     *
     * @param data: TaskModifyParams
     * @returns void
     */
    createTask(data) {
        database_1.TASKS.push(Object.assign(Object.assign({}, data), { id: database_1.TASKS[database_1.TASKS.length - 1].id + 1, created_at: Date.now() / 1000, updated_at: Date.now() / 1000 }));
    }
    /**
     * Create task
     *
     * @param taskId number
     * @param data: TaskModifyParams
     * @returns boolean
     */
    updateTask(task, data) {
        const index = this.findTaskIndex(task.id);
        database_1.TASKS[index] = Object.assign(Object.assign({}, database_1.TASKS[index]), data);
        return true;
    }
    /**
     * Find task
     *
     * @param taskId number
     * @returns Task
     */
    findTask(taskId) {
        return database_1.TASKS.find((taskItem) => taskItem.id === taskId);
    }
    /**
     * Find task
     *
     * @param taskId number
     * @returns Task
     */
    findTaskIndex(taskId) {
        const index = database_1.TASKS.findIndex((taskItem) => taskItem.id === taskId);
        if (index === -1)
            throw new Error("Invalid task parameter!");
        return index;
    }
    /**
     * Assign task to other users
     *
     * @param taskId number
     * @param userId number
     * @returns void
     */
    assignTask(taskId, userId) {
        if (this.checkTaskAssignee(taskId, userId))
            throw new Error("Assignee already exists");
        database_1.TASK_ASSIGNEES.push({
            id: database_1.TASK_ASSIGNEES[database_1.TASK_ASSIGNEES.length - 1].id + 1,
            task_id: taskId,
            user_id: userId,
        });
    }
    /**
     * Move task status (Change task group)
     *
     * @param taskId: number
     * @param groupId: number
     * @returns void
     */
    changeTaskGroup(task, groupId) {
        const index = this.findTaskIndex(task.id);
        database_1.TASKS[index] = Object.assign(Object.assign({}, database_1.TASKS[index]), { group_id: groupId });
    }
    /**
     * Check if task is assigned
     *
     * @param taskId number
     * @param userId number
     * @returns boolean
     */
    checkTaskAssignee(taskId, userId) {
        return (database_1.TASK_ASSIGNEES.find((taskAssignee) => taskAssignee.task_id === taskId &&
            taskAssignee.user_id === userId) !== undefined);
    }
    /**
     * Add a comment for the task
     *
     * @param userId number
     * @param taskId number
     * @param data Record<string, any>
     * @returns void
     */
    addComment(userId, taskId, data) {
        database_1.TASK_COMMENTS.push(Object.assign(Object.assign({}, data), { id: database_1.TASK_COMMENTS[database_1.TASK_COMMENTS.length - 1].id + 1, user_id: userId, task_id: taskId, created_at: Date.now() / 1000, updated_at: Date.now() / 1000 }));
    }
    /**
     * Delete task
     *
     * @param task Task
     * @returns void
     */
    deleteTask(task) {
        const index = this.findTaskIndex(task.id);
        database_1.TASKS.splice(index, 1);
    }
}
exports.default = TaskService;
