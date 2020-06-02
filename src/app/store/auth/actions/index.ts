import { LoginActions } from './auth-login.actions';
import { LoadUserActions } from './auth-load-user.actions';
import { LogoutActions } from './auth-logout.actions';
import { SignupActions } from './auth-signup.actions';
import { AddProfileImageActions } from './auth-add-profile-image.actions';

export * from './auth-login.actions';
export * from './auth-load-user.actions';
export * from './auth-logout.actions';
export * from './auth-signup.actions';
export * from './auth-add-profile-image.actions';

export type Actions =
    LoginActions |
    LoadUserActions |
    LogoutActions |
    SignupActions |
    AddProfileImageActions;
