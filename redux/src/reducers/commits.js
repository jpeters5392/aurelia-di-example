const initialState = {
    commits: [],
    loading: false
};

const commits = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMITS_RESPONSE':
        return Object.assign({}, state, { commits: action.commits, loading: false });
    case 'FETCH_COMMITS':
        return Object.assign({}, state, {
            loading: true
        });

    default:
        return state;
  }
};

export default commits;