import { injectConnect } from '../di/containerHelpers';
import CommitsComponent from '../components/CommitsComponent.jsx';
import { fetchCommits } from '../actionCreators/commits';

const mapStateToProps = (state) => {
    return {
        commits: state.commits.commits
    }
};

const mapDispatchToProps = {
    fetchCommits: fetchCommits
};

export default injectConnect({}, [ fetchCommits ], null, mapStateToProps, mapDispatchToProps)(CommitsComponent);