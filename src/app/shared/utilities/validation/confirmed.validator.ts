import { FormGroup, ValidationErrors } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return null;
        }
        if (control.value !== matchingControl.value) {
            return { confirmedValidator: true };
        } else {
            return null;
        }
    };
}
