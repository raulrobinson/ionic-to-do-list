import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TaskUseCase } from "../../application/use-cases/task.usecase";
import { Task } from "../../core/models/task.model";
import { Router } from "@angular/router";
import { AuthUseCase } from "../../application/use-cases/auth.usecase";
import { Observable } from "rxjs";
import { FirebaseTaskAdapter } from "../../infrastructure/tasks/firebase-task.adapter";
import { Category } from "../../core/models/category.model";
import { CategoryUseCase } from "../../application/use-cases/category.usecase";

@Component({
  standalone: true,
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class TodoPage implements OnInit {
  private taskUC = inject(TaskUseCase);
  form: FormGroup;
  tasks$: Observable<Task[]>;

  tasks: Task[] = [];
  newTaskTitle = '';

  categories: Category[] = [];
  categorySelected: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthUseCase,
    private router: Router,
    private taskUseCase: TaskUseCase,
    private taskAdapter: FirebaseTaskAdapter,
    private categoryUseCase: CategoryUseCase,
  ) {
    this.taskUseCase.getTasks().subscribe(tasks => this.tasks = tasks);
    this.form = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['']
    });
    this.tasks$ = this.taskUC.getTasks();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['']
    });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryUseCase.getCategories().subscribe(data => {
      this.categories = data;
      console.log('Categorias:', this.categories);
    });
  }

  async addTask() {
    this.newTaskTitle = this.form.value.title;
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
