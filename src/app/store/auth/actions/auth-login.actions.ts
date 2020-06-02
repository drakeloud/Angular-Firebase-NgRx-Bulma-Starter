import { User } from './../../../models/user';
import { Action } from '@ngrx/store';

export const LOGIN = '[auth] login';
export const LOGIN_SUCCESS = '[auth] login success';
export const LOGIN_ERROR = '[auth] login error';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public username: string, public password: string) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public userId: string) {}
}

export class LoginError implements Action {
    readonly type = LOGIN_ERROR;

    constructor(public error: any) {}
}

export type LoginActions = Login | LoginSuccess | LoginError;
