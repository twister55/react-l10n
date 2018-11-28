import * as React from 'react';

import Context from '../context';

interface LocalizationProviderProps {
    messages: object
    devMode?: boolean
}

export default class LocalizationProvider extends React.Component<LocalizationProviderProps> {
    static defaultProps = {
        messages: {},
        debug: false
    };

    render() {
        const localize = (key: string): string => {
            return this.props.messages[key];
        };

        return (
            <Context.Provider value={{ localize }}>
                {this.props.children}
            </Context.Provider>
        );
    }

}
