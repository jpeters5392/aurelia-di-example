import UserService from '../services/UserService';
import { inject } from 'aurelia-dependency-injection';

export function fetchUserProfile(userService) {
    return function() {
        return (dispatch) => {
            dispatch({ type: 'FETCH_USER' });
            return userService.loadUserProfile().then((data) => {
                dispatch({
                    type: 'USER_RESPONSE',
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            });
        };
    }
}

inject(UserService)(fetchUserProfile);
