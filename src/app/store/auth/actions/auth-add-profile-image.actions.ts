import { Action } from '@ngrx/store';

export const ADD_PROFILE_IMAGE = '[auth] add profile image';
export const ADD_PROFILE_IMAGE_SUCCESS = '[auth] add profile image success';
export const ADD_PROFILE_IMAGE_ERROR = '[auth] add profile image error';

export class AddProfileImage implements Action {
    readonly type = ADD_PROFILE_IMAGE;

    constructor(public image: any, public userId: string) {}
}

export class AddProfileImageSuccess implements Action {
    readonly type = ADD_PROFILE_IMAGE_SUCCESS;

    constructor(public imageUrl: string) {}
}

export class AddProfileImageError implements Action {
    readonly type = ADD_PROFILE_IMAGE_ERROR;

    constructor(public error: any) {}
}

export type AddProfileImageActions = AddProfileImage | AddProfileImageSuccess | AddProfileImageError;
