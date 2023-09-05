import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'odin-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.css']
})
export class InputIconComponent{

  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Input() searchable: boolean = false;
  @Output() handleSearch = new EventEmitter<string>();

  constructor() {}

  search(value: string): void {
    if(!this.searchable) return;
    this.handleSearch.emit(value);
  }
}
