import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { FirebaseTaskAdapter } from "./infrastructure/tasks/firebase-task.adapter";
import { FirebaseAuthAdapter } from "./infrastructure/auth/firebase-auth.adapter";

import { TASK_PORT } from "./core/ports/task.port";
import { AUTH_PORT } from "./core/ports/auth.port";
import { CATEGORY_PORT } from "./core/ports/category.port";
import { FirebaseCategoryAdapter } from "./infrastructure/tasks/firebase-category.adapter";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: AUTH_PORT, useClass: FirebaseAuthAdapter },
    { provide: TASK_PORT, useClass: FirebaseTaskAdapter },
    { provide: CATEGORY_PORT, useClass: FirebaseCategoryAdapter },
  ],
});
