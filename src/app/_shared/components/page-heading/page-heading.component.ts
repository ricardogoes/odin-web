import { Component, Input } from '@angular/core';
import { BreadcrumbLink } from './breadcrumb-link.model';

@Component({
  selector: 'odin-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})
export class PageHeadingComponent {

  @Input() title: string = '';
  @Input() links: BreadcrumbLink[] = [];

  constructor() {}
}
