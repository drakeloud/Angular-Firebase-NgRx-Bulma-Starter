import { State } from '../auth.state';
import * as actions from '../actions/auth-login.actions';
import { User } from 'src/app/models/user';

export function loginReducer(
    state: State,
    action: actions.LoginActions
): State {
    switch (action.type) {
        case actions.LOGIN_SUCCESS: {
            const newUser = new User();
            newUser.userId = action.userId;
            return {
                isLoggedIn: true,
                user: newUser
            };
        }
        case actions.LOGIN_ERROR: {
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
