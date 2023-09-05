import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgIconsModule } from '@ng-icons/core';
import { heroMagnifyingGlass, heroFunnel } from '@ng-icons/heroicons/outline';

import { InputIconComponent } from './input-icon.component';


@NgModule({
    declarations: [
      InputIconComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        NgIconsModule.withIcons({
          heroMagnifyingGlass, heroFunnel
        }),
    ],
    exports: [InputIconComponent]
})
export class InputIconModule {}
