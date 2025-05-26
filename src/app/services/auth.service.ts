import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "@angular/fire/auth";
import {UserCredential} from "../core/models/user-credential.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afAuth = inject(Auth);

  login(email: string, password: string) : Promise<UserCredential> {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async register(email: string, password: string, name: string, lastName: string) : Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await updateProfile(userCredential.user, {
      displayName: name + ' ' + lastName
    });
  }

  logout() {
    return signOut(this.afAuth);
  }
}
