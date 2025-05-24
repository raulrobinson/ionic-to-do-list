import { Injectable } from '@angular/core';
import { User } from "../../core/models/user.model";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "@angular/fire/auth";
import { authState } from 'rxfire/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthAdapter {
  constructor(private afAuth: Auth) {}

  async register(email: string, password: string, name: string) {
    const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await updateProfile(userCredential.user, {
      displayName: name
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async getUserId() {
    /*const user = await this.afAuth.currentUser
      .then((res) => {
        console.log(res);
        if (res) return res.uid;
        return;
      });*/
  }

  isAuthenticated() {
    return authState(this.afAuth).pipe(
      map(user => !!user)
    );
  }

  logout() {
    return signOut(this.afAuth);
  }
}
