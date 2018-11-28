import * as React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import LocalizedMessage, { LocalizationProvider } from '../../src/index';

const messages = {
    foo: 'bar'
};

test('provides a localize function that can be used to retrieve messages in a bundle', () => {
    const component = (
        <LocalizationProvider messages={messages}>
            <LocalizedMessage id='foo'/>
        </LocalizationProvider>
    );

    const { queryByText } = render(component);

    expect(queryByText('bar')).not.toBeNull();
});
