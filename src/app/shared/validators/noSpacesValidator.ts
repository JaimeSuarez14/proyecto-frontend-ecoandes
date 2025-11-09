import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  if (value.trim()==="") {
    return { noSpaces: true };
  }
  return null;
}
