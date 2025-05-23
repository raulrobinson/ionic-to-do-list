import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { AuthUseCase } from "../../application/use-cases/auth.usecase";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonItem, IonLabel, ReactiveFormsModule]
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(
    private auth: AuthUseCase,
    private router: Router
  ) {}

  async onRegister() {
    try {
      await this.auth.register(this.email, this.password);
      alert('Usuario registrado');
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error al registrar', error);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
