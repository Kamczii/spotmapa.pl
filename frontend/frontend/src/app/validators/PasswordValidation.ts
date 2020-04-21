import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('rpassword').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('rpassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
}