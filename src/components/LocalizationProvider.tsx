import * as React from 'react';

import Context from './context';
import Bundle from '../bundle';
import ResourceContext, { ChildrenIndex } from '../resource-context';
import { LocalizationProviderProps } from './types';

export default class LocalizationProvider extends React.Component<LocalizationProviderProps> {
    private bundle: Bundle;

    constructor(props: LocalizationProviderProps) {
        super(props);
        this.bundle = new Bundle(props.messages);
    }

    componentWillReceiveProps(nextProps: LocalizationProviderProps) {
        if (this.props.messages !== nextProps.messages) {
            this.bundle = new Bundle(nextProps.messages);
        }
    }

    render() {
        const localize = (id: string, data: object, children: ChildrenIndex): any => {
            let resource = this.bundle.get(id);

            if (resource) {
                return resource.tokens(new ResourceContext(data, children));
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
