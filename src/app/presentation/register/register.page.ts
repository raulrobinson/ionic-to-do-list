import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {FirebaseAuthAdapter} from "../../infrastructure/auth/firebase-auth.adapter";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonItem, IonLabel, IonText, ReactiveFormsModule, RouterLink]
})
export class RegisterPage {
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private fireAuth: FirebaseAuthAdapter,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async onRegister() {
    if (this.form.invalid) return;
    const { email, password, name } = this.form.value;
    if (password !== this.form.value.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    try {
      await this.fireAuth.register(email, password, name);
      alert('Usuario registrado');
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error al registrar', error);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  // Se ejecuta cada vez que entras a la página
  ionViewWillEnter() {
    this.form.reset();
  }

}
