import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('../presentation/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('../presentation/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'todo',
    loadComponent: () => import('../presentation/todo/todo.page').then(m => m.TodoPage)
  }
];
