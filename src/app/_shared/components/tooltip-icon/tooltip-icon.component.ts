import { Component, Input } from '@angular/core';

@Component({
  selector: 'odin-tooltip-icon',
  templateUrl: './tooltip-icon.component.html'
})
export class TooltipIconComponent {

  @Input() icon: string = '';
  @Input() message: string = '';

  hover: boolean = false;

  constructor() {}
}
