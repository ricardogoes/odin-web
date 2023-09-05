import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';

import { ValidationMessages, GenericValidator, ErrorMessage } from './generic-form-validation.service';

export abstract class FormBaseComponent {
  validationMessages: ValidationMessages = {};
  genericValidator: GenericValidator = new GenericValidator(this.validationMessages);
  errorMessage: ErrorMessage = {};

  protected configurarMensagensValidacao(
    validationMessages: ValidationMessages
  ): void {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacoesFormulario(
    formInputElements: ElementRef[],
    formGroup: FormGroup
  ): void {
    setTimeout(() => {
      const controlBlurs: Observable<any>[] = formInputElements.map(
        (formControl: ElementRef) =>
          fromEvent(formControl.nativeElement, 'blur')
      );

      merge(...controlBlurs).subscribe(() => {
        this.errorMessage = this.genericValidator.processarMensagens(formGroup);
      });
    }, 1000);
  }

  protected validaFormulario(formGroup: FormGroup): void {
    this.errorMessage = this.genericValidator.processarMensagens(formGroup);
  }

  protected trimValue(target: any, formGroup: FormGroup) {
    const controlName = target.attributes['formcontrolname'].value;
    formGroup.controls[controlName].setValue(target.value.trimStart());
  }
}
