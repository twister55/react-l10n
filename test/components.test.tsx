import * as React from 'react';
import { render } from 'react-testing-library';
import LocalizedMessage, { LocalizationProvider } from '../src/index';

test('localized message', () => {
    const component = (
        <LocalizationProvider messages={{ foo: 'bar' }}>
            <LocalizedMessage id='foo'/>
        </LocalizationProvider>
    );
    const { container } = render(component);

    expect(container.innerHTML === 'bar').toBeTruthy();
});
