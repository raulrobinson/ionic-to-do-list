import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Category } from "../../core/models/category.model";
import { CategoryUseCase } from "../../application/usecases/category.usecase";
import { Auth, getAuth } from "@angular/fire/auth";
import { TaskUseCase } from "../../application/usecases/task.usecase";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonItemSliding,
    IonList,
    RouterLink,
    IonLabel,
    IonInput
  ]
})
export class CategoriesPage implements OnInit {
  private auth: Auth = inject(Auth);
  private taskUC = inject(TaskUseCase);
  private categoryUC = inject(CategoryUseCase);
  private alert = inject(AlertController);

  categories$ = this.categoryUC.getUserCategories();
  userName = this.auth.currentUser?.displayName;

  newCategory = '';
  private categories: Category[] = [];

  constructor(private router: Router) {
    console.log('🚀 TasksPage constructor', this.auth);
    console.log('🚀 TasksPage constructor', this.auth.currentUser?.email);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryUC.getUserCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('📦 Categorías obtenidas:', this.categories);
      },
      error: (err) => {
        console.error('❌ Error al obtener categorías:', err);
      }
    });
  }

  async addCategory() {
    const alert = await this.alert.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nombre de la categoría' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async data => {
            const user = getAuth().currentUser;
            if (!user) {
              console.error('Usuario no autenticado');
              return;
            }
            if (data.name?.trim()) {
              const category: Category = {
                name: data.name.trim(),
                userId: user.uid,
              };
              await this.categoryUC.addCategory(category);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editCategory(cat: Category) {
    const alert = await this.alert.create({
      header: 'Editar categoría',
      inputs: [{ name: 'name', type: 'text', value: cat.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            if (data.name.trim().length) {
              this.categoryUC.updateCategory(cat.id!, data.name.trim());
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCategory(id: string) {
    await this.categoryUC.deleteCategory(id);
  }

  logout() {
    this.taskUC.logout()
      .then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
  }

  trackById(index: number, item: Category) {
    return item.id;
  }
}

