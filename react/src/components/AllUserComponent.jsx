import React from 'react';
import UserService from '../services/UserService';
import { configureInject } from '../di/containerHelpers.jsx';
import { All } from 'aurelia-dependency-injection';

class AllUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.userServices = props.injections[0];
    }
    componentDidMount() {
        const promises = this.userServices.map((userService) => {
            return userService.loadUserProfile();
        });
        return Promise.all(promises).then((data) => {
            this.setState({
                users: data
            });
        });
    }
    render () {
        return (<div>
            <h2>All Users</h2>
            <ul>
            {this.state.users.map((user) => (
                <li key={user.firstName+user.lastName}><span className='first-name'>{user.firstName}</span> <span className='last-name'>{user.lastName}</span> - <span className='email'>{user.email}</span></li>
            ))}
            </ul>
        </div>);
    }
}

export default configureInject({}, [ All.of(UserService) ])(AllUserComponent);

