import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipIconComponent } from './tooltip-icon.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroHomeSolid, heroChevronRightSolid } from '@ng-icons/heroicons/solid';
import { heroNoSymbol } from '@ng-icons/heroicons/outline';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
      TooltipIconComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        NgIconsModule.withIcons({
          heroHomeSolid, heroChevronRightSolid, heroNoSymbol
        }),
    ],
    exports: [TooltipIconComponent]
})
export class TooltipIconModule {}
