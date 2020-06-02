import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State as AuthState } from '../../store/auth/auth.state';
import * as authActions from '../../store/auth/actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private readonly authStore: Store<AuthState>) {
        this.loginForm = new FormGroup({
            email: new FormControl('test@test.com', [Validators.required, Validators.email]),
            password: new FormControl('password', [Validators.required])
        });
    }

    ngOnInit() {}

    private login(username, password) {
        this.authStore.dispatch(new authActions.Login(username, password));
    }

    public onSubmit() {
        if (this.loginForm.valid) {
            this.login(this.loginForm.value.email, this.loginForm.value.password);
        }
    }
}
