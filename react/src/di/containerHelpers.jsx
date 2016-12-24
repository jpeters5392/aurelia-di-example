import React, { createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import container from './rootContainer';

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
                if (options.useChildContainer) {
                    const containerToUse = props.container || container;
                    this.container = containerToUse.createChild();
                } else {
                    this.container = (props && props.container) ? props.container : container;
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