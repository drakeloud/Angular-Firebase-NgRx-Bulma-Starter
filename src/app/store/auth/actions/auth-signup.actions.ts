import { User, SignUpUser } from './../../../models/user';
import { Action } from '@ngrx/store';

export const SIGNUP = '[auth] signup';
export const SIGNUP_SUCCESS = '[auth] signup success';
export const SIGNUP_ERROR = '[auth] signup error';

export class Signup implements Action {
    readonly type = SIGNUP;

    constructor(public signupUser: SignUpUser) {}
}

export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;

    constructor(public signupUser: SignUpUser, public userId: string) {}
}

export class SignupError implements Action {
    readonly type = SIGNUP_ERROR;

    constructor(public error: any) {}
}

export type SignupActions = Signup | SignupSuccess | SignupError;
