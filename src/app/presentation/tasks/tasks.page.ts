import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList, IonRouterLink, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TaskUseCase } from "../../application/usecases/task.usecase";
import { Task } from "../../core/models/task.model";
import {Router, RouterLink} from "@angular/router";
import { Auth } from "@angular/fire/auth";
import {Category} from "../../core/models/category.model";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {TaskService} from "../../services/task.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonCheckbox,
    IonLabel,
    IonIcon,
    IonItemSliding,
    IonRouterLink,
    RouterLink,
    IonSelect,
    IonSelectOption,
  ]
})
export class TasksPage implements OnInit {
  /*private fb = inject(FormBuilder);
  private taskUC = inject(TaskUseCase);
  private auth: Auth = inject(Auth);
  private alertCtrl: AlertController = inject(AlertController);
  userName = this.auth.currentUser?.displayName;

  //tasks$ = this.taskUC.getUserTasks();
  tasks$: Observable<Task[]> = this.taskUC.getTasksNew();

  tasks: Task[] = [];
  newTask = '';

  constructor(
    private router: Router,
  ) {
    console.log('🚀 TasksPage constructor', this.auth);
    console.log('🚀 TasksPage constructor', this.auth.currentUser?.email);
  }

  ngOnInit() {
    this.getTasks();
  }*/

  /*getTasks() {
    this.taskUC.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('📦 Tareas obtenidas:', this.tasks);
      },
      error: (err) => {
        console.error('❌ Error al obtener tareas:', err);
      }
    });
  }*/

  /*async addTask() {
    const user = this.auth.currentUser;
    if (user && this.newTask.trim()) {
      await this.taskUC.addTask({ title: this.newTask, completed: false, userId: user.uid });
      this.newTask = '';
    }
  }*/

  //-------------------

  /*logout() {
    this.taskUC.logout()
      .then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
  }

  async toggleDone(task: Task) {
    await this.taskUC.updateTask(task.id!, { completed: !task.completed })
  }

  async deleteTask(id: string) {
    await this.taskUC.deleteTask(id);
  }*/

  /*async editTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: task.title,
          placeholder: 'Titulo de la tarea',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.title.trim()) {
              await this.taskUC.updateTask(task.id!, { title: data.title.trim() });
            }
          }
        }
      ]
    });

    await alert.present();
  }*/

  // TODO: [Rev. 2025-05-26_002] Refactor to use reactive forms

  // [VARIABLES]
  tasks: Task[] = [];
  categories: Category[] = [];
  taskTitle: string = '';
  selectedCategoryId: string = '';
  categoryName$: Observable<string | null> | null = null;
  filterCategoryId: string = '';

  // [INIT]
  private auth = inject(AuthService);
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private alertCtrl: AlertController = inject(AlertController);
  tasks$: Observable<Task[]> = this.taskService.getTasks();

  // [INITIALIZATION]
  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => this.categories = cats);
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks(this.filterCategoryId);
  }

  // [CREATE] Create a new task
  createTask() {
    if (!this.taskTitle.trim() || !this.selectedCategoryId) return;
    this.taskService.createTask(this.taskTitle, this.selectedCategoryId).subscribe(() => {
      this.taskTitle = '';
      this.selectedCategoryId = '';
    });
  }

  // [DELETE] Delete a task
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  async toggleDone(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
  }

  async editTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: task.title,
          placeholder: 'Titulo de la tarea',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.title.trim()) {
              this.taskService.updateTask(task.id!, {title: data.title.trim()});
            }
          }
        }
      ]
    });
    await alert.present();
  }

  applyCategoryFilter() {
    this.loadTasks();
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
  }
}
