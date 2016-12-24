import 'whatwg-fetch';

const userService = {
    loadUserProfile: function loadUserProfile() {
        return fetch('/user').then((response) => {
            return response.json();
        });
    }
};

export default userService;