import { inject } from 'aurelia-dependency-injection';
import CommitsService from '../services/CommitsService';

export function fetchCommits(commitsService) {
    return function() {
        return (dispatch) => {
            dispatch({ type: 'FETCH_COMMITS' });
            return commitsService.loadCommits().then((data) => {
                dispatch({
                    type: 'COMMITS_RESPONSE',
                    commits: data
                });
            });
        };
    }
}

inject(CommitsService)(fetchCommits);