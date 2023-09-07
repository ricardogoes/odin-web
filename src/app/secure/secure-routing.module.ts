import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then((m) => m.DepartmentsModule),
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path: 'positions',
        loadChildren: () => import('./positions/positions.module').then((m) => m.PositionsModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'prefix' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
