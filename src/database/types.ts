import { TASKS, USERS } from ".";

export type User = (typeof USERS)[0];
export type Task = (typeof TASKS)[1];
export type Group = (typeof USERS)[2];
