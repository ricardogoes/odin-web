import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Position } from '../models/positions.model';
import { PositionFilter } from '../models/positions-filter.model';

@Component({
  selector: 'odin-positions-filter',
  templateUrl: 'positions-filter.component.html',
})
export class PositionsFilterComponent {
  @Input() positions: Position[] = [];

  @Output() handleFilterData = new EventEmitter<PositionFilter>();
  @Output() handleCloseModal = new EventEmitter();

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      is_active: [''],
      last_updated_by: [''],
      last_updated_at_start: [''],
      last_updated_at_end: [''],
    });
  }

  get distinctCreatedBy(): string[] {
    return [...new Set(this.positions.map((item) => item.created_by))];
  }

  get distinctLastUpdatedBy(): string[] {
    return [...new Set(this.positions.map((item) => item.last_updated_by))];
  }

  filterData(): void {
    const filter = new PositionFilter();

    if (this.filterForm.controls['name'].value && this.filterForm.controls['name'].value !== '')
      filter.name = this.filterForm.controls['name'].value;

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
