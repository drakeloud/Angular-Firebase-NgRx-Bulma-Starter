import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.loginForm = new FormGroup({
            email: new FormControl('test@test.com', [Validators.required, Validators.email]),
            password: new FormControl('password', [Validators.required])
        });
    }

    ngOnInit() {}

    private login(username, password) {
        this.authService.login(username, password)
        .then()
        .catch((err) => {
            console.log(err);
        });
    }

    public onSubmit() {
        if (this.loginForm.valid) {
            this.login(this.loginForm.value.email, this.loginForm.value.password);
        }
    }
}
