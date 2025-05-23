import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TaskUseCase } from "../../application/use-cases/task.usecase";
import { Task } from "../../core/models/task.model";
import { Router } from "@angular/router";
import { AuthUseCase } from "../../application/use-cases/auth.usecase";

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  imports: [CommonModule, IonicModule, FormsModule]
})
export class TodoPage {
  tasks$ = this.taskUseCase.getTasks();
  newTaskTitle = '';

  constructor(
    private taskUseCase: TaskUseCase,
    private auth: AuthUseCase,
    private router: Router
  ) {}

  addTask() {
    if (!this.newTaskTitle) return;
    this.taskUseCase.addTask({ title: this.newTaskTitle, completed: false });
    this.newTaskTitle = '';
  }

  toggle(task: Task) {
    task.completed = !task.completed;
    this.taskUseCase.updateTask(task);
  }

  delete(task: Task) {
    if (task.id) this.taskUseCase.deleteTask(task.id);
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
    .catch(err => {
      console.error('Error al cerrar sesión', err);
    });
  }
}
