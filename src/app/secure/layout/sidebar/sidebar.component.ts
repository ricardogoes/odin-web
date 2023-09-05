import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'odin-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() handleExpandSidebar = new EventEmitter();

  constructor() {}

  expandSidebar(): void {
    this.handleExpandSidebar.emit();
  }
}
