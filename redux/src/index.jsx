import React from 'react';
import 'aurelia-polyfills';
import {render} from 'react-dom';
import UserProfileContainer from './containers/UserProfileContainer.jsx';
import CommitsContainer from './containers/CommitsContainer.jsx';
import ParentComponent from './components/ParentComponent.jsx';
import CommitsService from './services/CommitsService';
import UserService from './services/UserService';
import OtherUserService from './services/OtherUserService';
import ComplicatedService from './services/ComplicatedService';
import SimpleFormatter from './formatters/SimpleFormatter';
import { fetchUserProfile } from './actionCreators/user';
import { fetchCommits } from './actionCreators/commits';
import container from './di/rootContainer';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

container.registerInstance(CommitsService);
container.registerInstance(UserService);
container.registerInstance(OtherUserService);
container.registerInstance(SimpleFormatter);
container.registerTransient(fetchUserProfile);
container.registerTransient(fetchCommits);
container.registerSingleton(ComplicatedService);

class App extends React.Component {
  render () {
    return (
      <div>
        <UserProfileContainer />
        <CommitsContainer />
        <ParentComponent />
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('app'));