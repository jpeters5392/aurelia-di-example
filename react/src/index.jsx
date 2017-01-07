import React from 'react';
import 'aurelia-polyfills';
import {render} from 'react-dom';
import UserProfileComponent from './components/UserProfileComponent.jsx';
import CommitsComponent from './components/CommitsComponent.jsx';
import ParentComponent from './components/ParentComponent.jsx';
import AllUserComponent from './components/AllUserComponent.jsx';
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
container.registerInstance(UserProfileComponent);
container.registerInstance(ParentComponent);
container.registerInstance(AllUserComponent);
container.registerInstance(CommitsComponent);
const Profile = container.get(UserProfileComponent);
const Commits = container.get(CommitsComponent);
const Parent = container.get(ParentComponent);

class App extends React.Component {
  render () {
    return <div>
      <Profile />
      <Commits />
      <Parent />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));