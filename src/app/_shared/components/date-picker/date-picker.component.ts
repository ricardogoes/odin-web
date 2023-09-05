import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, } from '@angular/forms';

@Component({
  selector: 'odin-date-picker',
  templateUrl: './date-picker.component.html',
  viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() id = '';
  @Input() controlName = '';
  @Input() width = 'w-full';

  MONTH_NAMES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  showDatepicker = false;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  initDate() {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toLocaleDateString();
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(date: any) {
    const selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = selectedDate.toLocaleDateString();
    this.showDatepicker = false;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;
}
