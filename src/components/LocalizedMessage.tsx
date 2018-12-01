'use strict';

import * as React from 'react';
import LocalizationConsumer from './LocalizationConsumer';

interface LocalizedMessageProps {
    id: string;
    [extraProps: string]: any;
}

export default function LocalizedMessage(props: LocalizedMessageProps) {
    return (
        <LocalizationConsumer>
            {({ localize }) => localize(props.id, props)}
        </LocalizationConsumer>
    );
}
