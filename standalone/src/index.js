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

container.registerInstance(SimpleFormatter, SimpleFormatter);
container.registerSingleton(ComplicatedService, ComplicatedService);
container.registerInstance(UserService, UserService);
container.registerInstance(CommitsService, CommitsService);
container.registerTransient(CommitsComponent, CommitsComponent);
container.registerTransient(UserProfileComponent, UserProfileComponent);
container.registerTransient(ParentComponent, ParentComponent);
container.registerTransient(AllUserComponent, AllUserComponent);

const userProfileComponent = container.get(UserProfileComponent);
userProfileComponent.init(appRoot, container);
userProfileComponent.render();

const commitsComponent = container.get(CommitsComponent);
commitsComponent.init(appRoot, container);
commitsComponent.render();

const parentComponent = container.get((ParentComponent));
parentComponent.init(appRoot, container);
parentComponent.render();
