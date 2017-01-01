import React from 'react';
import UserProfileContainer from '../containers/UserProfileContainer.jsx';
import ComplicatedService from '../services/ComplicatedService';
import UserService from '../services/UserService';
import { fetchUserProfile } from '../actionCreators/user';
import OtherUserService from '../services/OtherUserService';
import { configureInject } from '../di/containerHelpers';
import { Lazy } from 'aurelia-dependency-injection';

function registerChildDependencies(container) {
    // register the OtherUserService on top of the existing UserService
    container.registerInstance(UserService, OtherUserService);
    // we have to register all upstream modules that require UserService,
    // since if we let the parent container resolve fetchUserProfile, then it 
    // will not traverse back down to the child to resolve the nested dependencies
    container.registerTransient(fetchUserProfile);
}
class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
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
            <UserProfileContainer container={this.props.container} />
            <div>{generatedString}</div>
        </div>);
    }
}

export default configureInject({ useChildContainer: true, childRegistrationFn: registerChildDependencies }, [ Lazy.of(ComplicatedService) ])(ParentComponent);



