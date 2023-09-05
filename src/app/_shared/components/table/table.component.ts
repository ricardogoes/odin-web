import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AtivoPipe } from '../../pipes/ativo.pipe';

import { TableAction } from './models/table-action.model';
import { TableColumn } from './models/table-column.model';
import { TablePipe } from './models/table-pipe.enum';
import { TableSort } from './models/table-sort.enum';

@Component({
  selector: 'odin-table',
  templateUrl: './table.component.html',
  providers: [AtivoPipe, DatePipe]
})
export class TableComponent<T> {

  @Input() columns: TableColumn[] = [];
  @Input() columnsSortOrder: Map<string, TableSort> = new Map<string, TableSort>();
  @Input() items: T[] = [];
  @Input() actions: TableAction[] = [];
  @Input() canDeactivateItem: boolean = false;

  @Output() handleAction = new EventEmitter<string>();
  @Output() handleSort = new EventEmitter<{ field: string, sort_order: TableSort }>();

  constructor(
    private ativoPipe: AtivoPipe,
    private datePipe: DatePipe
  ) {}

  getItemValue(item: T, column: TableColumn): any {
    let value = item[column.field as keyof typeof item];

    switch(column.pipe) {
      case TablePipe.ATIVO:
        return this.ativoPipe.transform(value as boolean);
      case TablePipe.DATETIME:
        return this.datePipe.transform(value as Date, 'dd/MM/yyyy');
      default:
        return value;
    }
  }

  getIsActiveItemValue(item: T): any {
    const column = this.columns.find(x => x.field == 'is_active')!;
    return item[column.field as keyof typeof item];
  }

  triggerAction(action: string): void {
    this.handleAction.emit(action);
  }

  sortItems(column: TableColumn): void {
    const sortOrder = this.columnsSortOrder.get(column.field)!;
    this.handleSort.emit({ field: column.field, sort_order: sortOrder });
  }
}
