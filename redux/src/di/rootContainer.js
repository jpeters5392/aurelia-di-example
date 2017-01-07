import { Container } from 'aurelia-dependency-injection';

let id = 0;
const idProperty = Symbol('ContainerId');
export function retrieveContainerId(container) {
    return container[idProperty];
}

export function setIdOnContainer(container) {
    container[idProperty] = id;
    id = id + 1;
}

const rootContainer = new Container();
rootContainer.makeGlobal();
setIdOnContainer(rootContainer);

export default rootContainer;