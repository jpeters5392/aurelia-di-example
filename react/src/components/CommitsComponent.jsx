import React from 'react';
import CommitsService from '../services/CommitsService';
import { configureInject } from '../di/containerHelpers.jsx';

class CommitsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: []
        };
        this.commitsService = props.injections[0];
    }
    componentDidMount() {
        return this.commitsService.loadCommits().then((data) => {
            this.setState({
                commits: data
            });
        });
    }
    render () {
        return (<div>
            <h2>Commits</h2>
            <ul>
                {this.state.commits.map((commit) => (
                    <li key={commit.id}>{commit.id} - {commit.title} - {commit.committer}</li>
                ))}
            </ul>
        </div>);
    }
}

export default configureInject({}, [ CommitsService ])(CommitsComponent);

