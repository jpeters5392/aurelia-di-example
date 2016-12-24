import React from 'react';
import UserProfileComponent from './UserProfileComponent.jsx';
import ComplicatedService from '../services/ComplicatedService';
import AllUserComponent from './AllUserComponent.jsx';
import UserService from '../services/UserService';
import OtherUserService from '../services/OtherUserService';
import { configureInject } from '../di/containerHelpers.jsx';
import { Lazy } from 'aurelia-dependency-injection';

class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
        // register the OtherUserService on top of the existing UserService
        props.container.registerAlias(OtherUserService, UserService);
        // since we used a Lazy resolver, create a property that returns the real dependency
        Object.defineProperty(this, 'complicatedService', {
            enumerable: true,
            configurable: false,
            get: () => {
                return props.injections[0]();
            }
        });
    }
    render () {
        const generatedString = this.complicatedService.generateString();
        // pass down the container so that the child components will use that to resolve
        return (<div>
            <h2>Parent Component</h2>
            <UserProfileComponent container={this.props.container} />
            <div>{generatedString}</div>
            <AllUserComponent container={this.props.container} />
        </div>);
    }
}

export default configureInject({ useChildContainer: true }, [ Lazy.of(ComplicatedService) ])(ParentComponent);



