import { createAction, nanoid } from "@reduxjs/toolkit";
import type { Task, TasksState } from "../app/App";
import type {
  CreateTodolistAction,
  DeleteTodolistAction,
} from "./todolists-reducer";

// Initial state
const initialState: TasksState = {};

export const tasksReducer = (
  state: TasksState = initialState,
  action: Actions
): TasksState => {
  switch (action.type) {
    case deleteTask.type: {
      const tasks = state[action.payload.todolistId];
      const taskIndex = tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
      }
      return { ...state, [action.payload.todolistId]: tasks };
    }
    case createTask.type: {
      const newTask: Task = {
        title: action.payload.title,
        isDone: false,
        id: nanoid(),
      };
      state[action.payload.todolistId].unshift(newTask);
      return { ...state };
    }
    case changeTaskStatus.type: {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.isDone = action.payload.isDone;
      }
      return { ...state };
    }
    case changeTaskTitle.type: {
      const task = state[action.payload.id].find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.title;
      }
      return { ...state };
    }
    case createTodolist.type: {
      return { ...state, [action.payload.id]: [] };
    }
    case deleteTodolist.type: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export const deleteTask = createAction<{ todolistId: string; taskId: string }>(
  "delete_task"
);
export const createTask = createAction<{ todolistId: string; title: string }>(
  "create_task"
);
export const changeTaskStatus = createAction<{
  todolistId: string;
  taskId: string;
  isDone: boolean;
}>("change_task_status");
export const changeTaskTitle = createAction<{
  todolistId: string;
  taskId: string;
  title: string;
}>("change_task_title");

export type DeleteTaskAction = ReturnType<typeof deleteTask>;
export type CreateTaskAction = ReturnType<typeof createTask>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatus>;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitle>;

type Actions =
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
  | CreateTodolistAction
  | DeleteTodolistAction;
