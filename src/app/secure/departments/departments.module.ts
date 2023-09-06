import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import {
  heroArrowDown,
  heroPencilSquare,
  heroNoSymbol,
  heroPlus,
  heroMagnifyingGlass,
  heroBackspace,
  heroEllipsisVertical,
  heroArrowUpTray
} from '@ng-icons/heroicons/outline';

import { PageHeadingModule } from 'src/app/_shared/components/page-heading/page-heading.module';
import { SearchListHeadingModule } from 'src/app/_shared/components/search-list-heading/search-list-heading.module';
import { PaginationModule } from 'src/app/_shared/components/pagination/pagination.module';
import { TableModule } from 'src/app/_shared/components/table/table.module';
import { DatePickerModule } from 'src/app/_shared/components/date-picker/date-picker.module';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsDetailComponent } from './departments-detail/departments-detail.component';

@NgModule({
  declarations: [
    DepartmentsListComponent,
    DepartmentsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroPlus,
      heroArrowDown,
      heroPencilSquare,
      heroNoSymbol,
      heroMagnifyingGlass,
      heroBackspace,
      heroEllipsisVertical,
      heroArrowUpTray
    }),
    DepartmentsRoutingModule,
    PageHeadingModule,
    SearchListHeadingModule,
    TableModule,
    PaginationModule,
    DatePickerModule,
  ],
})
export class DepartmentsModule {}
