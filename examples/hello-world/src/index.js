import React from 'react';
import { render } from 'react-dom';
import LocalizedMessage, { LocalizationProvider } from 'react-l10n';

const resources = {
    hello: 'Hello {user.name}'
};

const user = {
    name: 'Jon Doe'
};

render(
    <LocalizationProvider resources={resources}>
        <LocalizedMessage id='hello' user={user} />
    </LocalizationProvider>,
    document.getElementById('root')
);
