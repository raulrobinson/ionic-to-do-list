import { inject, Injectable } from '@angular/core';
import { AUTH_PORT } from '../../core/ports/auth.port';
import { User } from '../../core/models/user.model';
import { Auth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  private authAdapter = inject(AUTH_PORT);

  constructor(private auth: Auth) {}

  register(email: string, password: string) {
    const user: User = {
      email,
      password,
    };
    return this.authAdapter.register(user);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password).then(cred => cred.user);
  }

  logout() {
    return signOut(this.auth);
  }
}
