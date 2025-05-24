import { Routes } from '@angular/router';
import { AuthGuard } from "./handler/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./presentation/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () => import('./presentation/tasks/tasks.page').then(m => m.TasksPage)
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    loadComponent: () => import('./presentation/categories/categories.page').then(m => m.CategoriesPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./presentation/register/register.page').then(m => m.RegisterPage)
  },
];
