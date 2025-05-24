import { inject, Injectable } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TASK_PORT } from "../../core/ports/task.port";

@Injectable({ providedIn: 'root' })
export class TaskUseCase {
  private taskAdapter = inject(TASK_PORT);

  getTasks() {
    return this.taskAdapter.getUserTasks();
  }

  addTask(task: Task) {
    return this.taskAdapter.addTask(task);
  }

  deleteTask(id: string) {
    return this.taskAdapter.deleteTask(id);
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.taskAdapter.updateTask(id, data);
  }

  getTasksByCategory(categorySelected: string) {
    return [];
  }

  getUserTasks() {
    return this.taskAdapter.getUserTasks();
  }

  logout() {
    return this.taskAdapter.logout();
  }
}
