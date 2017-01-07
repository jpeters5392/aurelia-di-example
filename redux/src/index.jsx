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
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { userSelector, USER_SELECTOR_ID } from './reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

container.registerInstance(CommitsService);
container.registerInstance(UserService);
container.registerInstance(OtherUserService);
container.registerInstance(SimpleFormatter);
container.registerTransient(fetchUserProfile);
container.registerTransient(fetchCommits);
container.registerSingleton(ComplicatedService);
container.registerInstance(USER_SELECTOR_ID, userSelector);
container.registerInstance(UserProfileContainer);
container.registerInstance(CommitsContainer);
container.registerInstance(ParentComponent);

class App extends React.Component {
  render () {
    const Profile = container.get(UserProfileContainer);
    const Commits = container.get(CommitsContainer);
    const Parent = container.get(ParentComponent);
    return (
      <div>
        <Profile />
        <Commits />
        <Parent />
      </div>
    );
  }
}

render(<Provider store={store}><App/></Provider>, document.getElementById('app'));