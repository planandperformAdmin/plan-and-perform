import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path:'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path:'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path:'edit-profile',
    loadComponent: () => import('./features/profile/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
