import { Component } from '@angular/core';

@Component({
  selector: 'odin-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent {

  isSidebarExpanded: boolean = false;

  constructor() {}

  handleExpandSidebar(): void {
    const sidebar = document.getElementById('sidebar')!;

    console.log(sidebar);

    if (this.isSidebarExpanded) {
      sidebar.style.width = '4rem';
      this.isSidebarExpanded = false;
    } else {
      sidebar.style.width = '15rem';
      this.isSidebarExpanded = true;
    }

    const labels = sidebar.querySelectorAll('span');
    labels.forEach((label) => label.classList.toggle('opacity-0'));
  }
}
