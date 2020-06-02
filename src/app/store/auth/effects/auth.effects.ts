import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
    mergeMap,
    map,
    catchError,
    switchMap,
    tap
} from 'rxjs/operators';
import * as authActions from '../actions';
import { Observable, of, from } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions<authActions.Actions>,
        private readonly authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    login: Observable<Action> = this.actions$.pipe(
        ofType(authActions.LOGIN),
        mergeMap((action: authActions.Login) =>
            this.authService
                .login(action.username, action.password)
                .pipe(
                    map((userCredential => {
                        if (!userCredential || !userCredential.user) {
                            return new authActions.LoginError('Could not get user credentials');
                        }
                        return new authActions.LoginSuccess(userCredential.user.uid);
                    })),
                    catchError((err: any) =>
                        of(new authActions.LoginError(err))
                    )
                )
        )
    );

    @Effect({ dispatch: false })
    redirectToProfile = this.actions$.pipe(
        ofType(authActions.LOGIN_SUCCESS, authActions.SIGNUP_SUCCESS),
        tap(() => this.router.navigate(['profile']))
    );

    @Effect()
    loadUser: Observable<Action> = this.actions$.pipe(
        ofType(authActions.LOGIN_SUCCESS),
        mergeMap((action: authActions.LoginSuccess) => {
            return this.authService.loadUser(action.userId).pipe(
                map(
                    (documentData) => {
                        if (documentData.size !== 1) {
                            return new authActions.LoadUserError(
                                new Error('Unable to login because user not found or too many users returned!')
                            );
                        }

                        const newUser = User.fromJson(documentData.docs[0].data());
                        return new authActions.LoadUserSuccess(newUser);
                    }
                ),
                catchError((err: any) =>
                    of(new authActions.LoadUserError(err))
                )
            );
        })
    );

    @Effect()
    logout: Observable<Action> = this.actions$.pipe(
        ofType(authActions.LOGOUT),
        mergeMap((action: authActions.Logout) =>
            this.authService.logout()
                .pipe(
                    map(() => {
                        return new authActions.LogoutSuccess();
                    }),
                    catchError((err: any) =>
                        of(new authActions.LogoutError(err))
                    )
                )
        )
    );

    @Effect({ dispatch: false })
    logoutSuccess = this.actions$.pipe(
        ofType(authActions.LOGOUT_SUCCESS),
        tap(() => this.router.navigate(['login']))
    );

    @Effect()
    signup: Observable<Action> = this.actions$.pipe(
        ofType(authActions.SIGNUP),
        mergeMap((action: authActions.Signup) =>
            this.authService.signup(action.signupUser)
                .pipe(
                    map((userCredential => {
                        if (!userCredential || !userCredential.user) {
                            return new authActions.SignupError('Could not get user credentials');
                        }
                        return new authActions.SignupSuccess(action.signupUser, userCredential.user.uid);
                    })),
                    catchError((err: any) =>
                        of(new authActions.SignupError(err))
                    )
                )
        )
    );

    @Effect()
    saveUserDataToSignupUser: Observable<Action> = this.actions$.pipe(
        ofType(authActions.SIGNUP_SUCCESS),
        mergeMap((action: authActions.SignupSuccess) => {
            return this.authService.saveUserDataToSignupUser(action.signupUser, action.userId).pipe(
                map(
                    () => {
                        const newUser = new User();
                        newUser.firstName = action.signupUser.firstName;
                        newUser.lastName = action.signupUser.lastName;
                        newUser.email = action.signupUser.email;
                        newUser.userId = action.userId;
                        return new authActions.LoadUserSuccess(newUser);
                    }
                ),
                catchError((err: any) =>
                    of(new authActions.LoadUserError(err))
                )
            );
        })
    );

    @Effect()
    addProfileImage: Observable<Action> = this.actions$.pipe(
        ofType(authActions.ADD_PROFILE_IMAGE),
        mergeMap((action: authActions.AddProfileImage) =>
            this.authService.addProfileImage(action.userId, action.image)
                .pipe(
                    map((url => {
                        if (!url) {
                            return new authActions.AddProfileImageError('Could not upload profile');
                        }
                        return new authActions.AddProfileImageSuccess(url);
                    })),
                    catchError((err: any) =>
                        of(new authActions.AddProfileImageError(err))
                    )
                )
        )
    );



}
