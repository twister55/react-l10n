'use strict';

import * as React from 'react';
import LocalizationConsumer from './LocalizationConsumer';
import { LocalizedMessageProps } from './types';

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
