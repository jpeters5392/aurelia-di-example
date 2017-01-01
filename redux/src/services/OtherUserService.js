import 'whatwg-fetch';

const otherUserService = {
    loadUserProfile: function loadUserProfile() {
        return fetch('/otherUser').then((response) => {
            return response.json();
        });
    }
};

export default otherUserService;