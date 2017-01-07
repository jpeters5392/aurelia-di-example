import React, { createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import container, { retrieveContainerId, setIdOnContainer } from './rootContainer';
import UserService from '../services/UserService';
import { connect, bindActionCreators } from 'react-redux';

const DISPATCH = Symbol('Dispatch');
const INJECTED_SELECTORS = Symbol('InjectedSelector');
const CONTAINER = Symbol('Container');

/*
    This will determine if a container instance was passed in or if it needs to create one.
    This will also set a unique id on the new container and register services on it.
*/
function determineContainer(stateProps, ownProps, options, registrationFn) {
    if (stateProps && stateProps[CONTAINER]) {
        return stateProps[CONTAINER];
    }

    let currentContainer = container;
    if (ownProps && ownProps.container) {
        currentContainer = ownProps.container;
    } else if (stateProps && stateProps.container) {
        currentContainer = stateProps.container;
    }

    if (options && options.useChildContainer) {
        const childContainer = currentContainer.createChild();
        setIdOnContainer(childContainer);
        registerServices(childContainer, registrationFn);
        return childContainer;
    }
    return currentContainer;
}

function registerServices(containerToUse, registrationFn) {
    // allow the redux container to register services on the container
    if (typeof registrationFn === 'function') {
        registrationFn(containerToUse);
    }
}

/*
    This creates a decorator function that will allow you to inject reselect selectors into your mapStateToProps function
*/
export function injectSelectors(types) {
    return function(target) {
        // return a function that takes the container so we can resolve the types before calling the real state to props function
        function mapStateToPropsWrapper(container) {
            const injectedSelectors = types.map((type) => container.get(type));
            return function injectedStateToProps(state, ownProps) {
                return target(state, ownProps, ...injectedSelectors);
            };
        };
        mapStateToPropsWrapper[INJECTED_SELECTORS] = true;
        return mapStateToPropsWrapper;
    };
}

// this is meant to be used with a Redux container
export function injectConnect(options, types, registrationFn, mapStateToProps, mapDispatchToProps) {
    return function(target) {
        // we don't want to bind in the dispatch props function, since we need to inject the action creators later
        function dispatchProps(dispatch, ownProps) {
            const dispatchedProps = Object.assign({}, mapDispatchToProps);
            dispatchedProps[DISPATCH] = dispatch;
            return dispatchedProps;
        }

        // create a wrapper for the state to props that determines if we need to inject a container or not
        function stateToProps(state, ownProps) {
            // we need to set the container on the state so that mergeProps can use the same container instance
            const containerToUse = determineContainer(state, ownProps, options, registrationFn);
            if (typeof mapStateToProps === 'function') {
                if (mapStateToProps[INJECTED_SELECTORS]) {
                    const injectedStateToProps = mapStateToProps(containerToUse);
                    return Object.assign({}, { [CONTAINER]: containerToUse }, injectedStateToProps(state, ownProps));
                } else {
                    return Object.assign({}, { [CONTAINER]: containerToUse }, mapStateToProps(state, ownProps));
                }
            }

            return Object.assign({}, { [CONTAINER]: containerToUse }, mapStateToProps);
        }

        // resolve the action creators from the container and bind them to dispatch
        function mergeProps(stateProps, dispatchProps, ownProps) {
            const containerToUse = determineContainer(stateProps, ownProps, options, registrationFn);

            const injectedTypes = types.map((type) => containerToUse.get(type));
            const dispatch = dispatchProps[DISPATCH];
            const boundDispatchProps = {};
            Object.keys(dispatchProps).forEach((key) => {
                if (key === DISPATCH) return;
                const actionCreator = containerToUse.get(dispatchProps[key]);
                boundDispatchProps[key] = (...args) => {
                    dispatch(actionCreator.apply(null, args));
                };
            });

            // add the injections and the container to the props passed to the component
            return Object.assign({},
                ownProps,
                stateProps,
                boundDispatchProps,
                { 
                    injections: injectedTypes,
                    container: containerToUse
                }
            );
        }
        return connect(stateToProps, dispatchProps, mergeProps)(target);
    }
}

// this is meant to be used with a React component
export function configureInject(options, types) {
    if (!types) {
        types = [];
    }
    return function(target) {
        const targetName = target.displayName
            || target.name
            || 'Component';

        class InjectedComponent extends React.Component {
            constructor(props) {
                super(props);
                this.container = determineContainer({}, props, options, null);
                if (options && typeof options.childRegistrationFn === 'function') {
                    options.childRegistrationFn(this.container);
                }
            }
            render() {
                const injectedTypes = types.map((type) => this.container.get(type));
                const modifiedProps = Object.assign({}, this.props, { container: this.container, injections: injectedTypes });
                return createElement(target, modifiedProps);
            }
        }

        InjectedComponent.wrappedComponent = target;
        InjectedComponent.displayName = `InjectedComponent(${targetName})`;

        return hoistStatics(InjectedComponent, target);
    };
}