import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { NgIconsModule } from '@ng-icons/core';

import {
  heroHome,
  heroUserGroup,
  heroBuildingOffice,
  heroBriefcase,
  heroBars3
} from '@ng-icons/heroicons/outline';

import {
  heroCubeSolid
} from '@ng-icons/heroicons/solid';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgIconsModule.withIcons({
      heroHome,
      heroUserGroup,
      heroBuildingOffice,
      heroBriefcase,
      heroBars3,
      heroCubeSolid
    }),
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
