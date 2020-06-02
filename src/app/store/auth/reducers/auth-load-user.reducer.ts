import { State } from '../auth.state';
import * as actions from '../actions/auth-load-user.actions';

export function loadUserReducer(
    state: State,
    action: actions.LoadUserActions
): State {
    switch (action.type) {
        case actions.LOAD_USER_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.user
            };
        }
        case actions.LOAD_USER_ERROR: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return state;
        }
    }
}
