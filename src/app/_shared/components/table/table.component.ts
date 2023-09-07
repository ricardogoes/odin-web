import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { AtivoPipe } from '../../pipes/ativo.pipe';

import { TableAction } from './models/table-action.model';
import { TableColumn } from './models/table-column.model';
import { TablePipe } from './models/table-pipe.enum';
import { TableSort } from './models/table-sort.enum';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'odin-table',
  templateUrl: './table.component.html',
  providers: [AtivoPipe, DatePipe, NgxMaskPipe, CurrencyPipe]
})
export class TableComponent<T> implements OnInit {

  @Input() columns: TableColumn[] = [];
  @Input() columnsSortOrder: Map<string, TableSort> = new Map<string, TableSort>();
  @Input() items: T[] = [];
  @Input() actions: TableAction[] = [];
  @Input() canDeactivateItem = false;

  @Output() handleAction = new EventEmitter<{ item: T, action: string }>();
  @Output() handleSort = new EventEmitter<{ field: string, sort_order: TableSort }>();

  constructor(
    private ativoPipe: AtivoPipe,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private ngxMaskPipe: NgxMaskPipe
  ) {}

  ngOnInit(): void {
    console.log(this.items);
  }

  getItemValue(item: T, column: TableColumn): any {
    const value = item[column.field as keyof typeof item];

    switch(column.pipe) {
      case TablePipe.ATIVO:
        return this.ativoPipe.transform(value as boolean);
      case TablePipe.DATETIME:
        return this.datePipe.transform(value as Date, 'dd/MM/yyyy hh:mm');
      case TablePipe.CPF_CNPJ:
        return this.ngxMaskPipe.transform(value as string, '00.000.000/0000-00 || 000.000.000-00');
      case TablePipe.CURRENCY:
        return this.currencyPipe.transform(value as number, 'BRL');
      default:
        return value;
    }
  }

  getIsActiveItemValue(item: T): any {
    const column = this.columns.find(x => x.field == 'is_active');
    return item[column?.field as keyof typeof item];
  }

  triggerAction(item: T, action: string): void {
    this.handleAction.emit({ item: item, action: action });
  }

  sortItems(column: TableColumn): void {
    const sortOrder = this.columnsSortOrder.get(column.field) ?? TableSort.NOT_ORDERED;
    this.handleSort.emit({ field: column.field, sort_order: sortOrder });
  }
}
