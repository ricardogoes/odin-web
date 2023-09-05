import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_shared/services/auth.guard';

const routes: Routes = [
  {
      path: '',
      loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
  },
  {
      path: 'secure',
      loadChildren: () => import('./secure/secure.module').then((m) => m.SecureModule),
      canLoad: [ AuthGuard ], canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
