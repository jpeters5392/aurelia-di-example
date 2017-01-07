import { createSelector } from 'reselect';

const initialState = {
    user: {
        firstName: null,
        lastName: null,
        email: null,
    },
    otherUser: {
        firstName: null,
        lastName: null,
        email: null,
    },
    loading: false
};

const userFilter = state => state.user.user;
const otherUserFilter = state => state.user.otherUser;

export const userSelector = createSelector(userFilter, (user) => user);
export const USER_SELECTOR_ID = 'UserSelector';
export const otherUserSelector = createSelector(otherUserFilter, (user) => user);
export const OTHER_USER_SELECTOR_ID = 'OtherUserSelector';

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_RESPONSE':
        return Object.assign({}, state, {
            user: {
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            },
            loading: false
        });
    case 'FETCH_USER':
        return Object.assign({}, state, {
            loading: true
        });
    case 'OTHER_USER_RESPONSE':
        return Object.assign({}, state, {
            otherUser: {
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            },
            loading: false
        });
    case 'FETCH_OTHER_USER':
        return Object.assign({}, state, {
            loading: true
        });

    default:
        return state;
  }
};

export default user;