import { TASKS, TASK_ASSIGNEES, TASK_COMMENTS } from "../database";
import { Task, User } from "../database/types";

type TaskModifyParams = {
    title: string;
    description: string;
    group_id: number;
};

class TaskService {
    /**
     * Get all tasks
     *
     * @returns Task[]
     */
    getTasks() {
        return TASKS;
    }

    /**
     * Get user assigned tasks
     *
     * @param user User
     * @returns Task[]
     */
    getUserTasks(user: User) {
        return TASK_ASSIGNEES.filter(
            (taskAssignee) => taskAssignee.user_id === user.id
        );
    }

    /**
     * Create task
     *
     * @param data: TaskModifyParams
     * @returns void
     */
    createTask(data: TaskModifyParams) {
        TASKS.push({
            ...data,
            id: TASKS[TASKS.length - 1].id + 1,
            created_at: Date.now() / 1000,
            updated_at: Date.now() / 1000,
        });
    }

    /**
     * Create task
     *
     * @param taskId number
     * @param data: TaskModifyParams
     * @returns boolean
     */
    updateTask(task: Task, data: TaskModifyParams) {
        const index = this.findTaskIndex(task.id);

        TASKS[index] = {
            ...TASKS[index],
            ...data,
        };

        return true;
    }

    /**
     * Find task
     *
     * @param taskId number
     * @returns Task
     */
    findTask(taskId: number) {
        return TASKS.find((taskItem) => taskItem.id === taskId);
    }

    /**
     * Find task
     *
     * @param taskId number
     * @returns Task
     */
    findTaskIndex(taskId: number) {
        const index = TASKS.findIndex((taskItem) => taskItem.id === taskId);

        if (index === -1) throw new Error("Invalid task parameter!");

        return index;
    }

    /**
     * Assign task to other users
     *
     * @param taskId number
     * @param userId number
     * @returns void
     */
    assignTask(taskId: number, userId: number) {
        if (this.checkTaskAssignee(taskId, userId))
            throw new Error("Assignee already exists");

        TASK_ASSIGNEES.push({
            id: TASK_ASSIGNEES[TASK_ASSIGNEES.length - 1].id + 1,
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
    changeTaskGroup(task: Task, groupId: number) {
        const index = this.findTaskIndex(task.id);

        TASKS[index] = {
            ...TASKS[index],
            group_id: groupId,
        };
    }

    /**
     * Check if task is assigned
     *
     * @param taskId number
     * @param userId number
     * @returns boolean
     */
    checkTaskAssignee(taskId: number, userId: number) {
        return (
            TASK_ASSIGNEES.find(
                (taskAssignee) =>
                    taskAssignee.task_id === taskId &&
                    taskAssignee.user_id === userId
            ) !== undefined
        );
    }

    /**
     * Add a comment for the task
     *
     * @param userId number
     * @param taskId number
     * @param data Record<string, any>
     * @returns void
     */
    addComment(
        userId: number,
        taskId: number,
        data: {
            body: string;
        }
    ) {
        TASK_COMMENTS.push({
            ...data,
            id: TASK_COMMENTS[TASK_COMMENTS.length - 1].id + 1,
            user_id: userId,
            task_id: taskId,
            created_at: Date.now() / 1000,
            updated_at: Date.now() / 1000,
        });
    }

    /**
     * Delete task
     *
     * @param task Task
     * @returns void
     */
    deleteTask(task: Task) {
        const index = this.findTaskIndex(task.id);

        TASKS.splice(index, 1);
    }
}

export default TaskService;
