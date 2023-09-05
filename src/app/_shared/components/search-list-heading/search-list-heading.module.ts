import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgIconsModule } from '@ng-icons/core';
import { heroMagnifyingGlass, heroFunnel, heroArrowDownTray } from '@ng-icons/heroicons/outline';

import { SearchListHeadingComponent } from './search-list-heading.component';
import { InputIconModule } from '../input-icon/input-icon.module';


@NgModule({
    declarations: [
        SearchListHeadingComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        NgIconsModule.withIcons({
          heroMagnifyingGlass, heroFunnel, heroArrowDownTray
        }),
        InputIconModule
    ],
    exports: [SearchListHeadingComponent]
})
export class SearchListHeadingModule {}
