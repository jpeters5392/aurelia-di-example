import React from 'react';
import 'aurelia-polyfills';
import {render} from 'react-dom';
import UserProfileComponent from './components/UserProfileComponent.jsx';
import CommitsComponent from './components/CommitsComponent.jsx';
import ParentComponent from './components/ParentComponent.jsx';
import CommitsService from './services/CommitsService';
import UserService from './services/UserService';
import OtherUserService from './services/OtherUserService';
import ComplicatedService from './services/ComplicatedService';
import SimpleFormatter from './formatters/SimpleFormatter';
import container from './di/rootContainer';

container.registerInstance(CommitsService);
container.registerInstance(UserService);
container.registerInstance(OtherUserService);
container.registerInstance(SimpleFormatter);
container.registerSingleton(ComplicatedService);

class App extends React.Component {
  render () {
    return <div>
        <UserProfileComponent />
        <CommitsComponent />
        <ParentComponent />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));