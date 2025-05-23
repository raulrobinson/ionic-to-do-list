import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { InjectionToken } from "@angular/core";

export interface TaskPort {
  getTasks(): Observable<Task[]>;
  addTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
  updateTask(task: Task): Promise<void>;
}

export const TASK_PORT = new InjectionToken<TaskPort>('TaskPort');
