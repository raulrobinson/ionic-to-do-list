import { Observable } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { Task } from '../models/task.model';

export abstract class TaskPort {
  abstract getUserTasks(): Observable<Task[]>;
  abstract addTask(task: Task): Promise<any>;
  abstract deleteTask(id: string): Promise<void>;
  abstract updateTask(id: string, data: Partial<Task>): Promise<any>;
  abstract logout(): Promise<void>;
}

export const TASK_PORT = new InjectionToken<TaskPort>('TaskPort');
