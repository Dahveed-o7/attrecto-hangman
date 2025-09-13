import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueWordValidator(wordList: () => readonly string[]): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const forbidden = wordList().includes(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
