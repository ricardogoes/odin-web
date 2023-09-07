import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowLeft,
  heroArrowRight,
  heroArrowUp,
  heroNoSymbol,
  heroPencilSquare,
  heroCheck,
  heroMinus

} from '@ng-icons/heroicons/outline';

import { TooltipIconModule } from '../tooltip-icon/tooltip-icon.module';
import { PipesModule } from '../../pipes/pipes.module';

import { TableComponent } from './table.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    declarations: [
      TableComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgIconsModule.withIcons({
          heroArrowDown,
          heroArrowLeft,
          heroArrowRight,
          heroArrowUp,
          heroNoSymbol,
          heroPencilSquare,
          heroCheck,
          heroMinus
        }),
        NgxMaskDirective, NgxMaskPipe,
        TooltipIconModule,
        PipesModule
    ],
    exports: [TableComponent],
    providers: [provideNgxMask()]
})
export class TableModule {}
