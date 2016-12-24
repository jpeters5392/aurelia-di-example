import { Container } from 'aurelia-dependency-injection';

// creating the root container
const rootContainer = new Container();
// makeGlobal will take the current instance and set it on the static Container.instance property
rootContainer.makeGlobal();

export default rootContainer;