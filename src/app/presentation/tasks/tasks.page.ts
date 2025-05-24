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
  IonList, IonRouterLink,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TaskUseCase } from "../../application/usecases/task.usecase";
import { Task } from "../../core/models/task.model";
import {Router, RouterLink} from "@angular/router";
import { Auth } from "@angular/fire/auth";

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
  ]
})
export class TasksPage implements OnInit {
  private fb = inject(FormBuilder);
  private taskUC = inject(TaskUseCase);
  private auth: Auth = inject(Auth);
  private alertCtrl: AlertController = inject(AlertController);
  userName = this.auth.currentUser?.displayName;

  tasks$ = this.taskUC.getUserTasks();

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
  }

  getTasks() {
    this.taskUC.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('📦 Tareas obtenidas:', this.tasks);
      },
      error: (err) => {
        console.error('❌ Error al obtener tareas:', err);
      }
    });
  }

  async addTask() {
    const user = this.auth.currentUser;
    if (user && this.newTask.trim()) {
      await this.taskUC.addTask({ title: this.newTask, completed: false, userId: user.uid });
      this.newTask = '';
    }
  }

  logout() {
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
              await this.taskUC.updateTask(task.id!, { title: data.title.trim() });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
