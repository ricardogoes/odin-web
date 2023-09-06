import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsDetailComponent } from './departments-detail/departments-detail.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
              path: '',
              component: DepartmentsListComponent
          },
          {
              path: ':id',
              component: DepartmentsDetailComponent
          }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
