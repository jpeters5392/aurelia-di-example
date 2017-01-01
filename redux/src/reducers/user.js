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

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_RESPONSE':
        return Object.assign({}, {
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
        return Object.assign({}, {
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