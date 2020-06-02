import { User } from './../../../models/user';
import { Action } from '@ngrx/store';

export const LOAD_USER_SUCCESS = '[auth] load user success';
export const LOAD_USER_ERROR = '[auth] load user error';

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;

    constructor(public user: User) {}
}

export class LoadUserError implements Action {
    readonly type = LOAD_USER_ERROR;

    constructor(public error: any) {}
}

export type LoadUserActions = LoadUserSuccess | LoadUserError;
