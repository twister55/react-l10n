'use strict';

import * as React from 'react';
import LocalizationConsumer from './LocalizationConsumer';

interface LocalizedMessageProps {
    id: string;
    [extraProps: string]: any;
}

export default function LocalizedMessage(props: LocalizedMessageProps) {
    const data = {...props};

    React.Children.map(props.children, child => {
        if (child.key) {
            data[child.key] = child;
        }

        return child;
    });

    return (
        <LocalizationConsumer>
            {({ localize }) => localize(props.id, data)}
        </LocalizationConsumer>
    );
}
