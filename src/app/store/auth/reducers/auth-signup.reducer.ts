import { State } from '../auth.state';
import * as actions from '../actions/auth-signup.actions';
import { User } from 'src/app/models/user';

export function signupReducer(
    state: State,
    action: actions.SignupActions
): State {
    switch (action.type) {
        case actions.SIGNUP_SUCCESS: {
            const newUser = new User();
            newUser.userId = action.userId;
            newUser.email = action.signupUser.email;
            newUser.firstName = action.signupUser.firstName;
            newUser.lastName = action.signupUser.lastName;
            return {
                isLoggedIn: true,
                user: newUser
            };
        }
        case actions.SIGNUP_ERROR: {
            return {
                isLoggedIn: false,
                user: undefined
            };
        }
        default: {
            return state;
        }
    }
}
