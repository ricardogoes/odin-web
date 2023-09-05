import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroCubeSolid, heroBellSolid } from '@ng-icons/heroicons/solid';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroCubeSolid, heroBellSolid
    }),
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
