import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskUseCase } from "../../application/use-cases/task.usecase";
import { Task } from "../../core/models/task.model";
import { Router } from "@angular/router";
import { AuthUseCase } from "../../application/use-cases/auth.usecase";
import { Observable } from "rxjs";
import { FirebaseTaskAdapter } from "../../infrastructure/tasks/firebase-task.adapter";

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class TodoPage {
  private taskUC = inject(TaskUseCase);
  form: FormGroup;
  tasks$: Observable<Task[]>;

  tasks: Task[] = [];
  newTaskTitle = 'test-1';

  constructor(
    private fb: FormBuilder,
    private auth: AuthUseCase,
    private router: Router,
    private taskUseCase: TaskUseCase,
    private taskAdapter: FirebaseTaskAdapter
  ) {
    this.taskUseCase.getTasks().subscribe(tasks => this.tasks = tasks);
    this.form = this.fb.group({
      title: ['', Validators.required],
    });
    this.tasks$ = this.taskUC.getTasks();
  }

  async addTask() {
    const task: Task = { title: this.newTaskTitle, completed: false };
    await this.taskAdapter.addTask(task);
  }

  async toggleTask(task: Task) {
    await this.taskUC.updateTask({ ...task, completed: !task.completed });
  }

  async deleteTask(id: string) {
    await this.taskUC.deleteTask(id);
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
