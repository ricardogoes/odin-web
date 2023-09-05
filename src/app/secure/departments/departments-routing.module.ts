import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsListComponent } from './departments-list/departments-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
              path: '',
              component: DepartmentsListComponent
          }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
