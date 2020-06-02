import { Action } from '@ngrx/store';

export const LOGOUT = '[auth] logout';
export const LOGOUT_SUCCESS = '[auth] logout success';
export const LOGOUT_ERROR = '[auth] logout error';

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;
}

export class LogoutError implements Action {
    readonly type = LOGOUT_ERROR;

    constructor(public error: any) {}
}

export type LogoutActions = Logout | LogoutSuccess | LogoutError;
