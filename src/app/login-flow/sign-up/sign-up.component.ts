import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpUser } from 'src/app/models/user';
import { ConfirmedValidator } from 'src/app/shared/utilities/validation/confirmed.validator';
import { Store } from '@ngrx/store';
import { State as AuthState } from '../../store/auth/auth.state';
import * as authActions from '../../store/auth/actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup;

    constructor(private readonly authStore: Store<AuthState>) {
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
        this.authStore.dispatch(new authActions.Signup(signUpUser));
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
