import React from 'react';

class UserProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.complicatedService = props.injections[0];
    }
    componentDidMount() {
        this.props.fetchUserProfile();
    }
    render () {
        return (<div>
            <h2>User Profile</h2>
            <span className='first-name'>{this.props.firstName}</span> <span className='last-name'>{this.props.lastName}</span> - <span className='email'>{this.props.email}</span>
            <div>{this.complicatedService.generateString()}</div>
        </div>);
    }
}

export default UserProfileComponent;

