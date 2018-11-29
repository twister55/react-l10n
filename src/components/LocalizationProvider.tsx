import * as React from 'react';

import Context from './context';
import Bundle from '../bundle';

interface LocalizationProviderProps {
    messages: object
    devMode?: boolean
}

export default class LocalizationProvider extends React.Component<LocalizationProviderProps> {
    private bundle: Bundle;

    constructor(props: LocalizationProviderProps) {
        super(props);
        this.bundle = new Bundle(props.messages);
    }

    componentWillReceiveProps(nextProps: LocalizationProviderProps) {
        if (this.props.messages != nextProps.messages) {
            this.bundle = new Bundle(nextProps.messages);
        }
    }

    render() {
        const localize = (id: string): string => {
            const message = this.bundle.get(id);

            return message ? message : id;
        };

        return (
            <Context.Provider value={{ localize }}>
                {this.props.children}
            </Context.Provider>
        );
    }

}
