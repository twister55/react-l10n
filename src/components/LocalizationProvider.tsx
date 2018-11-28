import * as React from 'react';
import Context from './context';
import PropTypes from "prop-types";

interface ProviderProps {
    locale: string
}

export default class Provider extends React.Component<ProviderProps> {

    render() {
        const { _localize: localize } = this;
        const { locale } = this.props;

        return (
            <Context.Provider value={{ locale }}>
                {this.props.children}
            </Context.Provider>
        );
    }

    _localize = (key, values) => {
        const { localize, xLocale, messages, debug } = this.props;
        const isLocalizeProvided = localize !== Provider.defaultProps.localize;

        let localizeFn = localize;
        if (typeof localize !== 'function') {
            localizeFn = (messages, key) => {
                if (debug) console.warn(`Unable to localize ${key}, not connected to react-localize`);
                return key;
            };
        }

        if (isLocalizeProvided) {
            // doing sanity checks against the inputs, lookup, debug, xLocale are only
            // supported for the default behavior, when users provide their own override
            // method we can defer that to them
            return localizeFn(messages, key, values, xLocale, debug);
        }

        if (!messages || !key) {
            if (debug) console.warn('Unable to localize missing messages or key in arguments.');
            return null;
        }

        const lookup = messages[key];
        if (!lookup) {
            if (debug) console.warn(`Unable to localize missing messages or key in arguments for ${key}`);
            return key;
        }

        if (xLocale) {
            return 'XXXXXX';
        }

        return localizeFn(messages, key, values);
    }

    static propTypes = {
        children: PropTypes.node.isRequired,
        localize: PropTypes.func,
        messages: PropTypes.object.isRequired,
        xLocale: PropTypes.bool,
    }

    static defaultProps = {
        debug: false,
        localize(messages, key, values = null) {
            if (values) {
                return format(messages[key], values);
            }

            return format(messages[key]);
        },
        xLocale: false
    }
}
