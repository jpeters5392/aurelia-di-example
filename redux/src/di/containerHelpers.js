import React, { createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import container from './rootContainer';
import UserService from '../services/UserService';
import { connect, bindActionCreators } from 'react-redux';

const dispatchProperty = Symbol('Dispatch');

function determineContainer(props, options) {
    const currentContainer = (props && props.container) ? props.container : container;
    return (options && options.useChildContainer) ? currentContainer.createChild() : currentContainer;
}

// this is meant to be used with a Redux container
export function injectConnect(options, types, registrationFn, mapStateToProps, mapDispatchToProps) {
    return function(target) {
        // we don't want to bind in the dispatch props function, since we need to inject the action creators later
        function dispatchProps(dispatch, ownProps) {
            const dispatchedProps = Object.assign({}, mapDispatchToProps);
            dispatchedProps[dispatchProperty] = dispatch;
            return dispatchedProps;
        }

        // resolve the action creators from the container and bind them to dispatch
        function mergeProps(stateProps, dispatchProps, ownProps) {
            const containerToUse = determineContainer(ownProps, options);
            // allow the container to register on the container
            if (typeof registrationFn === 'function') {
                registrationFn(containerToUse);
            }

            const injectedTypes = types.map((type) => containerToUse.get(type));
            const dispatch = dispatchProps[dispatchProperty];
            const boundDispatchProps = {};
            Object.keys(dispatchProps).forEach((key) => {
                if (key === dispatchProperty) return;
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
        return connect(mapStateToProps, dispatchProps, mergeProps)(target);
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
                this.container = determineContainer(props, options);
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