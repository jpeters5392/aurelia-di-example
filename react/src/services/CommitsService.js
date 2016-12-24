import 'whatwg-fetch';

const commitsService = {
    loadCommits: function loadCommits() {
        return fetch('/commits').then((response) => {
            return response.json();
        });
    }
};

export default commitsService;