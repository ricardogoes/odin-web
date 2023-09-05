import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeadingComponent } from './page-heading.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroHomeSolid, heroChevronRightSolid } from '@ng-icons/heroicons/solid';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PageHeadingComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        NgIconsModule.withIcons({
          heroHomeSolid, heroChevronRightSolid
        }),
    ],
    exports: [PageHeadingComponent]
})
export class PageHeadingModule {}
