import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const startAtValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();
    const inputDate = new Date(control.value);

    if (control.value) {
      const currentDateTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds()
      );

      if (inputDate < currentDateTime) {
        return { startAtInvalid: true };
      }
    }

    return null;
  };
};

export const bidTimeValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const startAt = formGroup.get('startAt')?.value;
    const bidTime = formGroup.get('bidTime')?.value;

    if (startAt && !bidTime) {
      return { bidTimeRequired: true };
    }

    return null;
  };
};
