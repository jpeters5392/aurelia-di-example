import CommitsService from '../services/CommitsService';
import { inject } from 'aurelia-dependency-injection';

// the container passes the required types to the constructor
function CommitsComponent(commitsService) {
    this.commitsService = commitsService;
}

CommitsComponent.prototype.init = function CommitsComponent$init(parentElement, container) {
    this.container = container;
    this.element = document.createElement('div');
    this.element.className = 'commits-component';
    this.parentElement = parentElement;
    this.data = {};
    this.parentElement.appendChild(this.element);
};

CommitsComponent.prototype.render = function CommitsComponent$render() {
    return this.commitsService.loadCommits().then((data) => {
        const stringBuilder = [];
        stringBuilder.push('<h2>Commits</h2>');
        stringBuilder.push('<ul>');
        data.forEach((item) => {
            stringBuilder.push(`<li>${item.id} - ${item.title} - ${item.committer}</li>`);
        });
        stringBuilder.push('</ul>');
        this.element.innerHTML = stringBuilder.join('');
    });
};

// inject adds the required dependencies to the constructor function
inject(CommitsService)(CommitsComponent);
export default CommitsComponent;
