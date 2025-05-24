import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { HttpEvent, HttpRequest } from "@angular/common/module.d-CnjH8Dlt";
import { HttpHandler } from "@angular/common/http";
import { from, Observable, switchMap } from "rxjs";

@Injectable()
export class AuthInterceptor {
  constructor(private afAuth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.afAuth.currentUser).pipe(
      switchMap(user => {
        if (user) {
          return from(user.getIdToken()).pipe(
            switchMap(token => {
              const cloned = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(cloned);
            })
          );
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
