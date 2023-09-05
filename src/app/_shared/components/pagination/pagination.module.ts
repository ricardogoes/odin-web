import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline';

@NgModule({
    declarations: [
      PaginationComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgIconsModule.withIcons({
          heroArrowLeft, heroArrowRight
        }),
    ],
    exports: [PaginationComponent]
})
export class PaginationModule {}
