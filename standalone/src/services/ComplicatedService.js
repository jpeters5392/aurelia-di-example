import 'whatwg-fetch';
import SimpleFormatter from '../formatters/SimpleFormatter';
import { inject } from 'aurelia-dependency-injection';

function ComplicatedService(simpleFormatter) {
    this.simpleFormatter = simpleFormatter;
}

ComplicatedService.prototype.generateString = function ComplicatedService$generateString() {
    return this.simpleFormatter('testing');
};

// inject adds the required dependencies to the constructor function
inject(SimpleFormatter)(ComplicatedService);
export default ComplicatedService;
