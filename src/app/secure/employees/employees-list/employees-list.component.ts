import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

import { IComponentList } from 'src/app/_shared/interfaces/component-list.interface';

import { BreadcrumbLink } from 'src/app/_shared/components/page-heading/breadcrumb-link.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { Employee } from '../models/employees.model';
import { EmployeesService } from '../employees.service';
import { PaginationParams } from 'src/app/_shared/models/pagination-params.model';

import { TableAction } from 'src/app/_shared/components/table/models/table-action.model';
import { TableColumn } from 'src/app/_shared/components/table/models/table-column.model';
import { TablePipe } from 'src/app/_shared/components/table/models/table-pipe.enum';
import { TableSort } from 'src/app/_shared/components/table/models/table-sort.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeFilter } from '../models/employees-filter.model';

@Component({
  selector: 'odin-employees-list',
  templateUrl: 'employees-list.component.html',
})
export class EmployeesListComponent implements OnInit, IComponentList<Employee, EmployeeFilter> {
  breadCrumbsLinks: BreadcrumbLink[];

  columns: TableColumn[];
  columnsSortOrder: Map<string, TableSort> = new Map<string, TableSort>();
  actions: TableAction[];

  paginationData: PaginationParams;
  queryParams: string;

  paginatedApiResponse$: Observable<PaginatedApiResponse<Employee>> = new Observable<PaginatedApiResponse<Employee>>();

  employees: Employee[] = [];

  nameToBeSearched = '';

  showFilterModal = false;
  showActionMenu = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
    this.titleService.setTitle('Odin | Funcionários');

    this.breadCrumbsLinks = [
      {
        name: 'Funcionários',
        route: '/secure/employees',
      },
    ];

    this.columns = [
      { field: 'fullname', header_name: 'Nome Completo', sort: true },
      { field: 'document', header_name: 'Documento', sort: true, pipe: TablePipe.CPF_CNPJ },
      { field: 'email', header_name: 'Email', sort: true },
      { field: 'department_name', header_name: 'Departamento', sort: true },
      { field: 'is_active', header_name: 'Status', sort: false, pipe: TablePipe.ATIVO },
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
    console.log('ngOnInit');
    this.load();
  }

  get distinctCreatedBy(): string[] {
    return [...new Set(this.employees.map((item) => item.created_by))];
  }

  get distinctLastUpdatedBy(): string[] {
    return [...new Set(this.employees.map((item) => item.last_updated_by))];
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
    this.paginatedApiResponse$ = this.employeesService
      .findAll(this.queryParams)
      .pipe(
        map((response) => {
          this.paginationData = {
            page_number: response.page_number,
            page_size: response.page_size,
            total_pages: response.total_pages,
            total_records: response.total_records,
          };

          this.employees = [...response.items];
          this.employees.forEach(employee => {
            employee.fullname = `${employee.first_name} ${employee.last_name}`,
            employee.department_name = employee.department?.name
          });

          this.spinner.hide();
          return response;
        }),
        catchError((error) => {
          this.spinner.hide();
          this.toastrService.error(error.error.detail, 'Erro');

          return EMPTY;
        })
      );
  }

  handleOpenDetails(employeeId: string): void {
    this.router.navigate(['/secure/employees', employeeId]);
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

  handleAction(params: { item: Employee, action: string }): void {
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
      this.queryParams += `&first_name=${this.nameToBeSearched}`;
    }

    const sortField = sortParams.field === 'fullname' ? 'first_name' : sortParams.field;

    this.columnsSortOrder.delete(sortField);

    switch (sortParams.sort_order) {
      case TableSort.ASC:
        this.columnsSortOrder.set(sortField , TableSort.DESC);
        break;
      case TableSort.DESC:
      case TableSort.NOT_ORDERED:
        this.columnsSortOrder.set(sortField, TableSort.ASC);
        break;
    }

    const sortOrder = this.columnsSortOrder.get(sortField) == TableSort.ASC ? 'asc' : 'desc';
    this.queryParams += `&sort=${sortField} ${sortOrder}`;

    this.load();
  }

  handleFilterData(filterData: EmployeeFilter): void {
    this.queryParams = `?page_number=1&page_size=${this.paginationData.page_size}`;

    if (filterData.first_name)
      this.queryParams += `&first_name=${filterData.first_name}`;

    if (filterData.last_name)
      this.queryParams += `&last_name=${filterData.last_name}`;

    if (filterData.document)
      this.queryParams += `&document=${filterData.document}`;

    if (filterData.email)
      this.queryParams += `&email=${filterData.email}`;

    if (filterData.department_id)
      this.queryParams += `&department_id=${filterData.department_id}`;

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

  private activate(employeeId: string): void {
    this.employeesService.activate(employeeId).subscribe({
      next: () => {
        this.toastrService.success('Funcionário atualizado com sucesso', 'Sucesso');
        this.load();
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }

  private deactivate(employeeId: string): void {
    this.employeesService.deactivate(employeeId).subscribe({
      next: () => {
        this.toastrService.success('Funcionário atualizado com sucesso', 'Sucesso');
        this.load();
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }
}
