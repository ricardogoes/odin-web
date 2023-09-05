import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

import { IComponentList } from 'src/app/_shared/interfaces/component-list.interface';

import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { Department } from '../departments.model';
import { DepartmentsService } from '../departments.service';
import { PaginationParams } from 'src/app/_shared/models/pagination-params.model';

import { TableAction } from 'src/app/_shared/components/table/models/table-action.model';
import { TableColumn } from 'src/app/_shared/components/table/models/table-column.model';
import { TablePipe } from 'src/app/_shared/components/table/models/table-pipe.enum';
import { TableSort } from 'src/app/_shared/components/table/models/table-sort.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'odin-departments-list',
  templateUrl: 'departments-list.component.html',
})
export class DepartmentsListComponent implements OnInit, IComponentList {
  breadCrumbsLinks: BreadcrumbLink[];

  columns: TableColumn[];
  columnsSortOrder: Map<string, TableSort> = new Map<string, TableSort>();
  actions: TableAction[];

  paginationData: PaginationParams;
  queryParams: string;

  paginatedApiResponse$: Observable<PaginatedApiResponse<Department>> =
    new Observable<PaginatedApiResponse<Department>>();

  departments: Department[] = [];

  nameToBeSearched = '';

  showFilterModal = false;
  showActionMenu = false;

  filterForm: FormGroup;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private departmentsService: DepartmentsService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
    this.titleService.setTitle('Odin | Departamentos');

    this.breadCrumbsLinks = [
      {
        name: 'Departamentos',
        route: '/secure/departments',
      },
    ];

    this.columns = [
      { field: 'name', header_name: 'Nome', sort: true },
      {
        field: 'is_active',
        header_name: 'Status',
        sort: false,
        pipe: TablePipe.ATIVO,
      },
      {
        field: 'created_at',
        header_name: 'Criado em',
        sort: true,
        pipe: TablePipe.DATETIME,
      },
      { field: 'created_by', header_name: 'Criado por', sort: true },
      {
        field: 'last_updated_at',
        header_name: 'Atualizado em',
        sort: true,
        pipe: TablePipe.DATETIME,
      },
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

    this.filterForm = this.fb.group({
      name: [''],
      is_active: [''],
      created_by: [''],
      created_at_start: [''],
      created_at_end: [''],
      last_updated_by: [''],
      last_updated_at_start: [''],
      last_updated_at_end: [''],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  get distinctCreatedBy(): string[] {
    return [...new Set(this.departments.map((item) => item.created_by))];
  }

  get distinctLastUpdatedBy(): string[] {
    return [...new Set(this.departments.map((item) => item.last_updated_by))];
  }

  load(): void {
    this.spinner.show();
    this.paginatedApiResponse$ = this.departmentsService
      .findAll(this.queryParams)
      .pipe(
        map((response) => {
          this.paginationData = {
            page_number: response.page_number,
            page_size: response.page_size,
            total_pages: response.total_pages,
            total_records: response.total_records,
          };

          this.departments = response.items;

          this.spinner.hide();
          return response;
        }),
        catchError((error) => {
          this.spinner.hide();
          this.toastrService.error(error.detail, 'Erro');

          return EMPTY;
        })
      );
  }

  handleOpenDetails(departmentId: string): void {
    console.log('openDetail -> ' + departmentId);
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

  handleAction(action: string): void {
    console.log(`handleAction: ${action}`);
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

  handleFilterData(): void {
    this.queryParams = `?page_number=1&page_size=${this.paginationData.page_size}`;

    if (this.filterForm.controls['name'].value !== '')
      this.queryParams += `&name=${this.filterForm.controls['name'].value}`;

    if (this.filterForm.controls['is_active'].value !== '')
      this.queryParams += `&is_active=${this.filterForm.controls['is_active'].value}`;

    if (this.filterForm.controls['created_by'].value !== '')
      this.queryParams += `&created_by=${this.filterForm.controls['created_by'].value}`;

    if (this.filterForm.controls['created_at_start'].touched && this.filterForm.controls['created_at_start'].value !== '')
      this.queryParams += `&created_at_start=${this.filterForm.controls['created_at_start'].value}`;

    if (this.filterForm.controls['created_at_start'].touched && this.filterForm.controls['created_at_end'].value !== '')
      this.queryParams += `&created_at_end=${this.filterForm.controls['created_at_end'].value}`;

    if (this.filterForm.controls['last_updated_by'].value !== '')
      this.queryParams += `&last_updated_by=${this.filterForm.controls['last_updated_by'].value}`;

    if (this.filterForm.controls['created_at_start'].touched && this.filterForm.controls['last_updated_at_start'].value !== '')
      this.queryParams += `&last_updated_at_start=${this.filterForm.controls['last_updated_at_start'].value}`;

    if (this.filterForm.controls['created_at_start'].touched && this.filterForm.controls['last_updated_at_end'].value !== '')
      this.queryParams += `&last_updated_at_end=${this.filterForm.controls['last_updated_at_end'].value}`;

    this.toggleModal();
    this.load();
  }

  handleResetFilters(): void {
    this.filterForm.reset();
  }

  handleUploadData(): void {
    this.toastrService.error('Not implemented');
    this.toggleActionMenu();
  }

}
