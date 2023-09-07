import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Employee } from '../models/employees.model';
import { EmployeeFilter } from '../models/employees-filter.model';

@Component({
  selector: 'odin-employees-filter',
  templateUrl: 'employees-filter.component.html',
})
export class EmployeesFilterComponent {
  @Input() employees: Employee[] = [];

  @Output() handleFilterData = new EventEmitter<EmployeeFilter>();
  @Output() handleCloseModal = new EventEmitter();

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      document: [''],
      email: [''],
      department_id: [''],
      is_active: [''],
      last_updated_by: [''],
      last_updated_at_start: [''],
      last_updated_at_end: [''],
    });
  }

  get distinctCreatedBy(): string[] {
    return [...new Set(this.employees.map((item) => item.created_by))];
  }

  get distinctLastUpdatedBy(): string[] {
    return [...new Set(this.employees.map((item) => item.last_updated_by))];
  }

  filterData(): void {
    const filter = new EmployeeFilter();


    if (this.filterForm.controls['first_name'].value && this.filterForm.controls['first_name'].value !== '')
      filter.first_name = this.filterForm.controls['first_name'].value;

    if (this.filterForm.controls['last_name'].value && this.filterForm.controls['last_name'].value !== '')
    filter.last_name = this.filterForm.controls['last_name'].value;

    if (this.filterForm.controls['document'].value && this.filterForm.controls['document'].value !== '')
      filter.document = this.filterForm.controls['document'].value;

    if (this.filterForm.controls['email'].value && this.filterForm.controls['email'].value !== '')
      filter.email = this.filterForm.controls['email'].value;

    if (this.filterForm.controls['department_id'].value && this.filterForm.controls['department_id'].value !== '')
      filter.department_id = this.filterForm.controls['department_id'].value;

    if (this.filterForm.controls['is_active'].value && this.filterForm.controls['is_active'].value !== '')
      filter.is_active = this.filterForm.controls['is_active'].value;

    if (this.filterForm.controls['last_updated_by'].value && this.filterForm.controls['last_updated_by'].value !== '')
      filter.last_updated_by = this.filterForm.controls['last_updated_by'].value;

    if (this.filterForm.controls['last_updated_at_start'].touched && this.filterForm.controls['last_updated_at_start'].value !== '')
      filter.last_updated_at_start = new Date(this.filterForm.controls['last_updated_at_start'].value);

    if (this.filterForm.controls['last_updated_at_end'].touched && this.filterForm.controls['last_updated_at_end'].value !== '')
      filter.last_updated_at_end = new Date(this.filterForm.controls['last_updated_at_end'].value);

      this.handleFilterData.emit(filter);
  }

  closeModal(): void {
    this.handleCloseModal.emit();
  }

  handleResetFilters(): void {
    this.filterForm.reset();
  }
}
