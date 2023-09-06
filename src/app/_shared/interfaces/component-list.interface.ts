import { TableSort } from "../components/table/models/table-sort.enum";
import { PaginationParams } from "../models/pagination-params.model";

export interface IComponentList<T> {
  load(): void;
  handleOpenDetails(id: string): void;
  toggleActionMenu(): void;
  handleSearch(value: string): void;
  handleOpenFiltersModel(): void;
  handleExportData(): void;
  handleChangePagination(paginationData: PaginationParams): void;
  handleAction(params: { item: T, action: string }): void;
  handleSort(sortParams: {field: string, sort_order: TableSort}): void;
  handleFilterData(): void;
  handleResetFilters(): void;
}
