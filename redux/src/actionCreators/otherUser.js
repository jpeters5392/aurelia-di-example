import { inject } from 'aurelia-dependency-injection';
import OtherUserService from '../services/OtherUserService';

export function fetchUserProfile(otherUserService) {
    return function() {
        return (dispatch) => {
            dispatch({ type: 'FETCH_OTHER_USER' });
            return otherUserService.loadUserProfile().then((data) => {
                dispatch({
                    type: 'OTHER_USER_RESPONSE',
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
            });
        };
    }
}

inject(OtherUserService)(fetchUserProfile);