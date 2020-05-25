import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpUser } from 'src/app/models/user';
import { ConfirmedValidator } from 'src/app/shared/utilities/validation/confirmed.validator';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.signUpForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('test@test.com', [Validators.required, Validators.email]),
            password: new FormControl('password', [Validators.required]),
            confirmPassword: new FormControl('password', [Validators.required])
        }, {
            validators: ConfirmedValidator('password', 'confirmPassword')
        });
    }

    ngOnInit() {}

    private signUp(signUpUser: SignUpUser) {
        this.authService.signup(signUpUser)
        .then()
        .catch((err) => {
            console.log(err);
        });
    }

    public onSubmit() {
        if (this.signUpForm.valid) {
            this.signUp({
                firstName: this.signUpForm.value.firstName,
                lastName: this.signUpForm.value.lastName,
                email: this.signUpForm.value.email,
                password: this.signUpForm.value.password,
            });
        }
    }
}
