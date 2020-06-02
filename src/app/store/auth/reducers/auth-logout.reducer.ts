import { State } from '../auth.state';
import * as actions from '../actions/auth-logout.actions';

export function logoutUserReducer(
    state: State,
    action: actions.LogoutActions
): State {
    switch (action.type) {
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_ERROR: {
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
