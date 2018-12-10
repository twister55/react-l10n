import * as React from 'react';

import Context from './context';
import ResourcesBundle from '../resources-bundle';
import ResourceContext, { ChildrenIndex } from '../resource-context';

export interface LocalizationProviderProps {
    resources: object
    onMissingResource?: MissingResourceHandler
}

export interface MissingResourceHandler {
    (id: string): string
}

export default class LocalizationProvider extends React.Component<LocalizationProviderProps> {
    private bundle: ResourcesBundle;

    constructor(props: LocalizationProviderProps) {
        super(props);
        this.bundle = new ResourcesBundle(props.resources);
    }

    componentWillReceiveProps(nextProps: LocalizationProviderProps) {
        if (this.props.resources !== nextProps.resources) {
            this.bundle = new ResourcesBundle(nextProps.resources);
        }
    }

    render() {
        const localize = (id: string, data: object, children: ChildrenIndex): any => {
            let resource = this.bundle.get(id);

            if (resource) {
                return resource.tokens(new ResourceContext(data, children));
            }

            if (this.props.onMissingResource) {
                return this.props.onMissingResource(id);
            }

            return id;
        };

        return (
            <Context.Provider value={{ localize }}>
                {this.props.children}
            </Context.Provider>
        );
    }

}
