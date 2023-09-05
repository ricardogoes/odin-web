import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'odin-search-list-heading',
  templateUrl: './search-list-heading.component.html',
  styleUrls: ['./search-list-heading.component.css'],
})
export class SearchListHeadingComponent implements OnInit {
  @Output() handleOpenFiltersModel = new EventEmitter();
  @Output() handleSearch = new EventEmitter<string>();
  @Output() handleExportData = new EventEmitter();
  searchFormGroup: FormGroup;

  constructor() {
    this.searchFormGroup = new FormGroup({
      search: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.searchFormGroup.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.handleSearch.emit(value);
      });
  }

  openFiltersModal(): void {
    this.handleOpenFiltersModel.emit();
  }

  exportData(): void {
    this.handleExportData.emit();
  }
}
