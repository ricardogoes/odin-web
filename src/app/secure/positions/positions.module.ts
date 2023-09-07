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

import { PositionsRoutingModule } from './positions-routing.module';
import { PositionsListComponent } from './positions-list/positions-list.component';
import { PositionsDetailComponent } from './positions-detail/positions-detail.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PositionsFilterComponent } from './positions-filter/positions-filter.component';

@NgModule({
  declarations: [
    PositionsListComponent,
    PositionsFilterComponent,
    PositionsDetailComponent
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
    NgxMaskDirective, NgxMaskPipe,
    PositionsRoutingModule,
    PageHeadingModule,
    SearchListHeadingModule,
    TableModule,
    PaginationModule,
    DatePickerModule,
  ],
  providers: [provideNgxMask()]
})
export class PositionsModule {}
