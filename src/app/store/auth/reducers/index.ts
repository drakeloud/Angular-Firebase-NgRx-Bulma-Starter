import { State } from '../auth.state';
import * as authActions from '../actions';
import { loginReducer } from './auth-login.reducer';
import { loadUserReducer } from './auth-load-user.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { logoutUserReducer } from './auth-logout.reducer';
import { signupReducer } from './auth-signup.reducer';
import { addProfileImageReducer } from './auth-add-profile-image.reducer';

export const initialState: State = {
    isLoggedIn: false,
    user: undefined
};

export function reducer(
    state: State = initialState,
    action: authActions.Actions
): State {
    if ([authActions.LOGIN_SUCCESS, authActions.LOGIN_ERROR].includes(action.type)) {
        return loginReducer(
            state,
            action as authActions.LoginActions
        );
    }

    if ([authActions.LOAD_USER_SUCCESS].includes(action.type)) {
        return loadUserReducer(
            state,
            action as authActions.LoadUserActions
        );
    }

    if ([authActions.LOGOUT_SUCCESS, authActions.LOGOUT_ERROR].includes(action.type)) {
        return logoutUserReducer(
            state,
            action as authActions.LogoutActions
        );
    }

    if ([authActions.SIGNUP_SUCCESS, authActions.SIGNUP_ERROR].includes(action.type)) {
        return signupReducer(
            state,
            action as authActions.SignupActions
        );
    }

    if ([authActions.ADD_PROFILE_IMAGE_SUCCESS, authActions.ADD_PROFILE_IMAGE_ERROR].includes(action.type)) {
        return addProfileImageReducer(
            state,
            action as authActions.AddProfileImageActions
        );
    }

    return state;
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: State) => state.isLoggedIn
);

export const selectUser = createSelector(
    selectAuthState,
    (state: State) => state.user
);

