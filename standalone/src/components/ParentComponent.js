import OtherUserService from '../services/OtherUserService';
import UserService from '../services/UserService';
import { inject, Lazy } from 'aurelia-dependency-injection';
import UserProfileComponent from './UserProfileComponent';
import AllUserComponent from './AllUserComponent';
import ComplicatedService from '../services/ComplicatedService';

function ParentComponent(complicatedService) {
    Object.defineProperty(this, 'complicatedService', {
        enumerable: true,
        configurable: false,
        get: () => {
            return complicatedService();
        }
    });
}

ParentComponent.prototype.init = function ParentComponent$init(parentElement, container) {
    this.container = container.createChild();
    this.registerChildren();
    this.element = document.createElement('div');
    this.element.className = 'parent-component';
    this.parentElement = parentElement;
    this.data = {};
    this.parentElement.appendChild(this.element);
    this.initChildren();
};

ParentComponent.prototype.initChildren = function ParentComponent$initChildren() {
    this.userProfileComponent = this.container.get(UserProfileComponent);
    this.userProfileComponent.init(this.element);
    this.allUserComponent = this.container.get(AllUserComponent);
    this.allUserComponent.init(this.element);
};

ParentComponent.prototype.registerChildren = function ParentComponent$registerChildren() {
    this.container.registerInstance(UserService, OtherUserService);
    this.container.registerTransient(UserProfileComponent, UserProfileComponent);
};

ParentComponent.prototype.render = function ParentComponent$render() {
    this.userProfileComponent.render();
    this.allUserComponent.render();
    const childElement = document.createElement('div');
    childElement.innerHTML = this.complicatedService.generateString();
    this.element.appendChild(childElement);
};

inject(Lazy.of(ComplicatedService))(ParentComponent);
export default ParentComponent;
