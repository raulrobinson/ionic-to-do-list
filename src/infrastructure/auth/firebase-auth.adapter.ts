import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthAdapter {
  constructor(private auth: Auth) {}

  register(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
