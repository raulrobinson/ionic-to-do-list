import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { AUTH_PORT } from "./app/core/ports/auth.port";
import { FirebaseAuthAdapter } from "./app/infrastructure/auth/firebase-auth.adapter";

import { TASK_PORT } from "./app/core/ports/task.port";
import { FirebaseTaskAdapter } from "./app/infrastructure/tasks/firebase-task.adapter";

import { CATEGORY_PORT } from "./app/core/ports/category.port";
import { FirebaseCategoryAdapter } from "./app/infrastructure/categories/firebase-category.adapter";

import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

addIcons({ trash });

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Provide the adapters for the ports
    { provide: AUTH_PORT, useClass: FirebaseAuthAdapter },
    { provide: TASK_PORT, useClass: FirebaseTaskAdapter },
    { provide: CATEGORY_PORT, useClass: FirebaseCategoryAdapter },
  ],
});
