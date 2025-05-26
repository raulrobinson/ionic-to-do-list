import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Router, RouterLink } from "@angular/router";
import { FirebaseAuthAdapter } from "../../infrastructure/auth/firebase-auth.adapter";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonText, IonButton, RouterLink]
})
export class LoginPage {
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private fireAuth: FirebaseAuthAdapter,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Se ejecuta cada vez que entras a la página
  ionViewWillEnter() {
    this.form.reset();
  }

  async login() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    await this.fireAuth.login(email, password)
      .then(async (res) => {
        const user = res.user;
        if (user) {
          const token = await user.getIdToken();
          console.log('Login successful:', user.email);
          localStorage.setItem('accessToken', token);
          await this.router.navigate(['/tasks']);
        }
      });
  }
}
