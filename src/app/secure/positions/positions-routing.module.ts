import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionsListComponent } from './positions-list/positions-list.component';
import { PositionsDetailComponent } from './positions-detail/positions-detail.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
              path: '',
              component: PositionsListComponent
          },
          {
              path: ':id',
              component: PositionsDetailComponent
          }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PositionsRoutingModule { }
