import UserService from '../services/UserService';
import { inject, All } from 'aurelia-dependency-injection';

function AllUserProfileComponent(userServices) {
    this.userServices = userServices;
}

AllUserProfileComponent.prototype.init = function AllUserProfileComponent$init(parentElement, container) {
    this.parentElement = parentElement;
    this.container = container;
    this.element = document.createElement('div');
    this.element.className = 'userprofile-component';
    this.data = {};
    this.parentElement.appendChild(this.element);
}

AllUserProfileComponent.prototype.render = function AllUserProfileComponent$render() {
    this.userServices.forEach((userService) => {
        userService.loadUserProfile().then((data) => {
            this.element.innerHTML += `<span class='first-name'>${data.firstName}</span> <span class='last-name'>${data.lastName}</span> - <span class='email'>${data.email}</span>`;
        });
    });
};

inject(All.of(UserService))(AllUserProfileComponent);
export default AllUserProfileComponent;
