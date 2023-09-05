import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ativo',
})
export class AtivoPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) {
      return 'Ativo';
    } else {
      return 'Inativo';
    }
  }
}
