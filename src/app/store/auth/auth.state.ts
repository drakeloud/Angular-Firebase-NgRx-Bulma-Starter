import { User } from '../../models/user';

export interface State {
    isLoggedIn: boolean;
    user: User;
}
