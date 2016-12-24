import 'aurelia-polyfills';
import container from './di/rootContainer';
import UserProfileComponent from './components/UserProfileComponent';
import CommitsComponent from './components/CommitsComponent';
import ParentComponent from './components/ParentComponent';
import CommitsService from './services/CommitsService';
import UserService from './services/UserService';
import SimpleFormatter from './formatters/SimpleFormatter';
import ComplicatedService from './services/ComplicatedService';
import AllUserComponent from './components/AllUserComponent';

const appRoot = document.querySelector('#appRoot');

// register all of the items with the global container
// instances are existing objects that are returned by the container
container.registerInstance(SimpleFormatter, SimpleFormatter);
container.registerInstance(UserService, UserService);
container.registerInstance(CommitsService, CommitsService);
// singletons are constructor functions that are new'd up once and then reused
container.registerSingleton(ComplicatedService, ComplicatedService);
// transients are always new'd up whenever requested
container.registerTransient(CommitsComponent, CommitsComponent);
container.registerTransient(UserProfileComponent, UserProfileComponent);
container.registerTransient(ParentComponent, ParentComponent);
container.registerTransient(AllUserComponent, AllUserComponent);

// resolve the top level components and render them
const userProfileComponent = container.get(UserProfileComponent);
userProfileComponent.init(appRoot, container);
userProfileComponent.render();

const commitsComponent = container.get(CommitsComponent);
commitsComponent.init(appRoot, container);
commitsComponent.render();

const parentComponent = container.get((ParentComponent));
parentComponent.init(appRoot, container);
parentComponent.render();
