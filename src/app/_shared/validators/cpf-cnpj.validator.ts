import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfCnpjValidator implements Validator {
  static cpfLength = 11;
  static cnpjLength = 14;

  /**
   * Calcula o dígito verificador do CPF ou CNPJ.
   */
  static buildDigit(arr: number[]): number {
    const isCpf = arr.length < CpfCnpjValidator.cpfLength;
    const digit =
      arr
        .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
        .reduce((total, current) => total + current) %
      CpfCnpjValidator.cpfLength;

    if (digit < 2 && isCpf) {
      return 0;
    } else if (digit < 2) {
      return 0;
    }

    return CpfCnpjValidator.cpfLength - digit;
  }

  /**
   * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
   */
  static validate(c: AbstractControl): ValidationErrors | null {
    const cpfCnpj = c.value.replace(/\D/g, '');

    // Verifica o tamanho da string.
    if (
      [CpfCnpjValidator.cpfLength, CpfCnpjValidator.cnpjLength].indexOf(
        cpfCnpj.length
      ) < 0
    ) {
      return { invalidCpfCnpj: true };
    }

    // Verifica se todos os dígitos são iguais.
    if (/^([0-9])\1*$/.test(cpfCnpj)) {
      return { invalidCpfCnpj: true };
    }

    // A seguir é realizado o cálculo verificador.
    const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(CpfCnpjValidator.buildDigit(cpfCnpjArr));

    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
      // Dígito verificador não é válido, resultando em falha.
      return { invalidCpfCnpj: true };
    }

    return null;
  }

  /**
   * Implementa a interface de um validator.
   */
  validate(c: AbstractControl): ValidationErrors | null {
    return CpfCnpjValidator.validate(c);
  }
}
