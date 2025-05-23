import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import {FirebaseAuthAdapter} from "../../infrastructure/auth/firebase-auth.adapter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private authService: FirebaseAuthAdapter,
    private router: Router
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigateByUrl('/todo');
    } catch (error) {
      console.error('Login error', error);
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
