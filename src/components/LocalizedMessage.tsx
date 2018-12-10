'use strict';

import * as React from 'react';
import LocalizationConsumer from './LocalizationConsumer';

export interface LocalizedMessageProps {
    id: string
    [data: string]: any
}

export default function LocalizedMessage(props: LocalizedMessageProps) {
    const children = {};

    React.Children.map(props.children, child => {
        if (child.key) {
            children[child.key] = child;
        }

        return children;
    });

    return (
        <LocalizationConsumer>
            {({ localize }) => localize(props.id, props, children)}
        </LocalizationConsumer>
    );
}
