import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { FirebaseAuthAdapter } from "../infrastructure/auth/firebase-auth.adapter";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: FirebaseAuthAdapter, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
