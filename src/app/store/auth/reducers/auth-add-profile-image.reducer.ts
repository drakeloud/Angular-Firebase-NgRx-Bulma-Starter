import { State } from '../auth.state';
import * as actions from '../actions/auth-add-profile-image.actions';
import { User } from 'src/app/models/user';

export function addProfileImageReducer(
    state: State,
    action: actions.AddProfileImageActions
): State {
    switch (action.type) {
        case actions.ADD_PROFILE_IMAGE_SUCCESS: {
            const user = User.fromJson(JSON.parse(JSON.stringify(state.user)));
            user.photoUrl = action.imageUrl;
            return {
                ...state,
                user
            };
        }
        case actions.ADD_PROFILE_IMAGE_ERROR: {
            const user = User.fromJson(JSON.parse(JSON.stringify(state.user)));
            user.photoUrl = null;
            return {
                ...state,
                user
            };
        }
        default: {
            return state;
        }
    }
}
