import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
              path: '',
              component: EmployeesListComponent
          },
          {
              path: ':id',
              component: EmployeesDetailComponent
          }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule { }
