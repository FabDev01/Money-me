import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';

import { redirectUnauthorizedToLogin } from './core/features/guards/features-routes.guard';
import { redirectLoggedInUsers } from './core/auth/guards/auth-router.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin), // ! Redirecionar usuários não autenticados para uma rota diferente "login"
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/components/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    ...canActivate(redirectLoggedInUsers), // ! Redirecionar usuários autenticados para uma rota diferente "home"
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/components/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    ...canActivate(redirectLoggedInUsers),
  },
  {
    path: 'forget',
    loadChildren: () =>
      import('./auth/components/forget/forget.module').then(
        (m) => m.ForgetPageModule
      ),
    ...canActivate(redirectLoggedInUsers),
  },
  // {
  //   path: 'splash',
  //   loadChildren: () =>
  //     import('./features/splash-screen/splash-screen.module').then(
  //       (m) => m.SplashScreenPageModule
  //     ),
  // },
  // {
  //   path: '',
  //   redirectTo: '/splash',
  //   pathMatch: 'full',
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
