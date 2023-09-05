import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationParams } from '../../models/pagination-params.model';

@Component({
  selector: 'odin-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {

  @Input() paginationData: PaginationParams | undefined;
  @Output() handleChangePagination = new EventEmitter<PaginationParams>();

  constructor() {}

  // Pagination functions
  changePageSize(selectedValue: number): void {
    this.paginationData!.page_size = selectedValue;
    this.handleChangePagination.emit(this.paginationData!);
  }

  changePageNumber(pageNumber: number): void {
    this.paginationData!.page_number = pageNumber;
    this.handleChangePagination.emit(this.paginationData!);
  }

  nextPageNumber(): void {
    this.paginationData!.page_number += 1;
    this.handleChangePagination.emit(this.paginationData!);
  }

  previousPageNumber(): void {
    this.paginationData!.page_number -= 1;
    this.handleChangePagination.emit(this.paginationData!);
  }

  get totalPages(): number[] {
    let pages: number[] = [];
    for (let i = 1; i <= this.paginationData!.total_pages; i++) {
      pages.push(i);
    }
    return pages;
  }

  get hasMoreThanOnePage(): boolean {
    return this.paginationData!.total_pages > 1;
  }
}
