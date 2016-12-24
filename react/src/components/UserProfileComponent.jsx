import React from 'react';
import UserService from '../services/UserService';
import { configureInject } from '../di/containerHelpers.jsx';

class UserProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null
        };
        this.userService = props.injections[0];
    }
    componentDidMount() {
        return this.userService.loadUserProfile().then((data) => {
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            });
        });
    }
    render () {
        return (<div>
            <h2>User Profile</h2>
            <span className='first-name'>{this.state.firstName}</span> <span className='last-name'>{this.state.lastName}</span> - <span className='email'>{this.state.email}</span>
        </div>);
    }
}

export default configureInject({}, [ UserService ])(UserProfileComponent);

