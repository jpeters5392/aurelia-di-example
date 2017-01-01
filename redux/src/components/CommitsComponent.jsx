import React from 'react';

class CommitsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchCommits();
    }
    render () {
        return (<div>
            <h2>Commits</h2>
            <ul>
                {this.props.commits.map((commit) => (
                    <li key={commit.id}>{commit.id} - {commit.title} - {commit.committer}</li>
                ))}
            </ul>
        </div>);
    }
}

export default CommitsComponent;

