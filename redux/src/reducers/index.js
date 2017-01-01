import { combineReducers } from 'redux';
import user from './user'
import commits from './commits'

const demoApp = combineReducers({
  user,
  commits
});

export default demoApp;