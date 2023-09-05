import { NgModule } from '@angular/core';

import { AtivoPipe } from './ativo.pipe';

@NgModule({
  declarations: [
    AtivoPipe
  ],
  exports: [
    AtivoPipe
  ]
})
export class PipesModule { }
