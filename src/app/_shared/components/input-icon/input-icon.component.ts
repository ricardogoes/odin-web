import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'odin-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.css']
})
export class InputIconComponent{

  @Input() icon = '';
  @Input() placeholder = '';
  @Input() searchable = false;
  @Output() handleSearch = new EventEmitter<string>();

  search(value: string): void {
    if(!this.searchable) return;
    this.handleSearch.emit(value);
  }
}
