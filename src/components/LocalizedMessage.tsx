import * as React from 'react';
import LocalizationConsumer from './LocalizationConsumer';

interface LocalizedMessageProps {
    id: string
}

export default class LocalizedMessage extends React.Component<LocalizedMessageProps> {

    render() {
        return (
            <LocalizationConsumer>
                {({ localize }) => localize(this.props.id)}
            </LocalizationConsumer>
        );
    }

}
