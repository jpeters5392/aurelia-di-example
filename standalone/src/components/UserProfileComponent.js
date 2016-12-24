import UserService from '../services/UserService';
import { inject } from 'aurelia-dependency-injection';

function UserProfileComponent(userService) { 
    this.userService = userService;
}

UserProfileComponent.prototype.init = function UserProfileComponent$init(parentElement, container) {
    this.parentElement = parentElement;
    this.container = container;
    this.element = document.createElement('div');
    this.element.className = 'userprofile-component';
    this.data = {};
    this.parentElement.appendChild(this.element);
}

UserProfileComponent.prototype.render = function UserProfileComponent$render() {
    return this.userService.loadUserProfile().then((data) => {
        this.element.innerHTML = `<span class='first-name'>${data.firstName}</span> <span class='last-name'>${data.lastName}</span> - <span class='email'>${data.email}</span>`;
    });
};

inject(UserService)(UserProfileComponent);
export default UserProfileComponent;
