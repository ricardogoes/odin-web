import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

import { IComponentList } from 'src/app/_shared/interfaces/component-list.interface';

import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { Position } from '../models/positions.model';
import { PositionsService } from '../positions.service';
import { PaginationParams } from 'src/app/_shared/models/pagination-params.model';

import { TableAction } from 'src/app/_shared/components/table/models/table-action.model';
import { TableColumn } from 'src/app/_shared/components/table/models/table-column.model';
import { TablePipe } from 'src/app/_shared/components/table/models/table-pipe.enum';
import { TableSort } from 'src/app/_shared/components/table/models/table-sort.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PositionFilter } from '../models/positions-filter.model';

@Component({
  selector: 'odin-positions-list',
  templateUrl: 'positions-list.component.html',
})
export class PositionsListComponent implements OnInit, IComponentList<Position, PositionFilter> {
  breadCrumbsLinks: BreadcrumbLink[];

  columns: TableColumn[];
  columnsSortOrder: Map<string, TableSort> = new Map<string, TableSort>();
  actions: TableAction[];

  paginationData: PaginationParams;
  queryParams: string;

  paginatedApiResponse$: Observable<PaginatedApiResponse<Position>> = new Observable<PaginatedApiResponse<Position>>();

  positions: Position[] = [];

  nameToBeSearched = '';

  showFilterModal = false;
  showActionMenu = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private positionsService: PositionsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
    this.titleService.setTitle('Odin | Cargos');

    this.breadCrumbsLinks = [
      {
        name: 'Cargos',
        route: '/secure/positions',
      },
    ];

    this.columns = [
      { field: 'name', header_name: 'Nome', sort: true },
      { field: 'base_salary', header_name: 'Salário Base', sort: false, pipe: TablePipe.CURRENCY },
      { field: 'is_active', header_name: 'Status', sort: false, pipe: TablePipe.ATIVO, },
      { field: 'last_updated_at', header_name: 'Atualizado em', sort: true, pipe: TablePipe.DATETIME, },
      { field: 'last_updated_by', header_name: 'Atualizado por', sort: true },
    ];

    this.columns.forEach((column) => {
      this.columnsSortOrder.set(column.field, TableSort.NOT_ORDERED);
    });

    this.actions = [
      { action: 'edit', icon: 'heroPencilSquare', tooltip: 'Editar' },
    ];

    this.paginationData = {
      page_number: 1,
      page_size: 5,
      total_pages: 0,
      total_records: 0,
    };

    this.queryParams = `?page_number=${this.paginationData.page_number}&page_size=${this.paginationData.page_size}`;
  }

  ngOnInit(): void {
    this.load();
  }

  get distinctCreatedBy(): string[] {
    return [...new Set(this.positions.map((item) => item.created_by))];
  }

  get distinctLastUpdatedBy(): string[] {
    return [...new Set(this.positions.map((item) => item.last_updated_by))];
  }

  setDefaultQueryParams(): void {
    this.paginationData = {
      page_number: 1,
      page_size: 5,
      total_pages: 0,
      total_records: 0,
    };

    this.queryParams = `?page_number=${this.paginationData.page_number}&page_size=${this.paginationData.page_size}`;
  }

  load(): void {
    this.spinner.show();
    this.paginatedApiResponse$ = this.positionsService
      .findAll(this.queryParams)
      .pipe(
        map((response) => {
          this.paginationData = {
            page_number: response.page_number,
            page_size: response.page_size,
            total_pages: response.total_pages,
            total_records: response.total_records,
          };

          this.positions = [...response.items];

          this.spinner.hide();
          return response;
        }),
        catchError((error) => {
          this.spinner.hide();
          console.log(JSON.stringify(error));
          this.toastrService.error(error.error.detail, 'Erro');

          return EMPTY;
        })
      );
  }

  handleOpenDetails(positionId: string): void {
    this.router.navigate(['/secure/positions', positionId]);
  }

  toggleActionMenu(): void {
    this.showActionMenu = !this.showActionMenu;
  }

  handleSearch(value: string): void {
    this.queryParams = `?page_number=1&page_size=${this.paginationData.page_size}`;

    this.nameToBeSearched = value;

    if (value && value !== '') {
      this.queryParams += `&name=${value}`;
    }

    this.load();
  }

  handleOpenFiltersModel(): void {
    this.toggleModal();
  }

  handleExportData(): void {
    this.toastrService.error('Not implemented');
  }

  toggleModal(): void {
    this.showFilterModal = !this.showFilterModal;
  }

  handleChangePagination(paginationData: PaginationParams): void {
    this.paginationData = paginationData;
    this.queryParams = `?page_number=${paginationData.page_number}&page_size=${paginationData.page_size}`;
    this.load();
  }

  handleAction(params: { item: Position, action: string }): void {
    switch(params.action) {
      case "edit":
        this.handleOpenDetails(params.item.id);
        break;
      case "activate":
        this.activate(params.item.id);
        break;
      case "deactivate":
        this.deactivate(params.item.id);
        break;
      default:
        this.toastrService.error(`Invalid action: ${params.action}`);
    }
  }


  handleSort(sortParams: { field: string; sort_order: TableSort }): void {
    this.queryParams = `?page_number=1&page_size=${this.paginationData.page_size}`;

    if (this.nameToBeSearched !== '') {
      this.queryParams += `&name=${this.nameToBeSearched}`;
    }

    this.columnsSortOrder.delete(sortParams.field);

    switch (sortParams.sort_order) {
      case TableSort.ASC:
        this.columnsSortOrder.set(sortParams.field, TableSort.DESC);
        break;
      case TableSort.DESC:
      case TableSort.NOT_ORDERED:
        this.columnsSortOrder.set(sortParams.field, TableSort.ASC);
        break;
    }

    const sortOrder = this.columnsSortOrder.get(sortParams.field) == TableSort.ASC ? 'asc' : 'desc';
    this.queryParams += `&sort=${sortParams.field} ${sortOrder}`;

    this.load();
  }

  handleFilterData(filterData: PositionFilter): void {
    this.queryParams = `?page_number=1&page_size=${this.paginationData.page_size}`;

    if (filterData.name)
      this.queryParams += `&name=${filterData.name}`;

    if (filterData.is_active)
      this.queryParams += `&is_active=${filterData.is_active}`;

    if (filterData.last_updated_by)
      this.queryParams += `&last_updated_by=${filterData.last_updated_by}`;

    if (filterData.last_updated_at_start)
      this.queryParams += `&last_updated_at_start=${filterData.last_updated_at_start}`;

    if (filterData.last_updated_at_end)
      this.queryParams += `&last_updated_at_end=${filterData.last_updated_at_end}`;

    this.toggleModal();
    this.load();
  }

  handleUploadData(): void {
    this.toastrService.error('Not implemented');
    this.toggleActionMenu();
  }

  private activate(positionId: string): void {
    this.positionsService.activate(positionId).subscribe({
      next: () => {
        this.toastrService.success('Departamento atualizado com sucesso', 'Sucesso');
        this.load();
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }

  private deactivate(positionId: string): void {
    this.positionsService.deactivate(positionId).subscribe({
      next: () => {
        this.toastrService.success('Departamento atualizado com sucesso', 'Sucesso');
        this.load();
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }
}
