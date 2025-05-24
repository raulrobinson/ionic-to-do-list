import { inject, Injectable } from '@angular/core';
import { AUTH_PORT } from '../../core/ports/auth.port';
import { User } from '../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  private authAdapter = inject(AUTH_PORT);

  register(email: string, password: string) {
    const user: User = { email, password };
    return this.authAdapter.register(user);
  }

  login(email: string, password: string) {
    const user: User = { email, password };
    return this.authAdapter.login(user);
  }

  logout() {
    return this.authAdapter.logout();
  }

  getUserId() {
    return this.authAdapter.getUserId();
  }

  isAuthenticated() {
    return this.authAdapter.isAuthenticated();
  }
}
