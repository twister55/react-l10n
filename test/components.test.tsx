import * as React from 'react';
import { render } from 'react-testing-library';
import LocalizedMessage, { LocalizationProvider } from '../src/index';

describe('localized message', () => {

    test('simple text', () => {
        const component = (
            <LocalizationProvider resources={{ foo: 'bar' }}>
                <LocalizedMessage id='foo'/>
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML === 'bar').toBeTruthy();
    });

    test('text with value', () => {
        const component = (
            <LocalizationProvider resources={{ foo: 'my name is {user.name}' }}>
                <LocalizedMessage id='foo' user={{ name: 'Jon Doe' }}/>
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML === 'my name is Jon Doe').toBeTruthy();
    });

    test('text with component as child', () => {
        const user = { name: 'Jon Doe' };
        const component = (
            <LocalizationProvider resources={{ foo: 'my name is {user}' }}>
                <LocalizedMessage id='foo'>
                    <a key="user" href="#">{user.name}</a>
                </LocalizedMessage>
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML).toBe('my name is <a href="#">Jon Doe</a>');
        expect(container.querySelector('a') !== null).toBeTruthy();
    });

    test('text with component as prop', () => {
        const user = { name: 'Jon Doe' };
        const userLink = <a key="user" href="#">{user.name}</a>;
        const component = (
            <LocalizationProvider resources={{ foo: 'my name is {user}' }}>
                <LocalizedMessage id='foo' user={userLink}/>
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML).toBe('my name is <a href="#">Jon Doe</a>');
        expect(container.querySelector('a') !== null).toBeTruthy();
    });

    test('missing resource', () => {
        const component = (
            <LocalizationProvider resources={{ key: 'value' }}>
                <LocalizedMessage id='foo' />
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML).toBe('foo');
    });


    test('missing resource with custom handler', () => {
        const missingResource = 'no resource';
        const component = (
            <LocalizationProvider resources={{ key: 'value' }} onMissingResource={() => missingResource}>
                <LocalizedMessage id='foo' />
            </LocalizationProvider>
        );
        const { container } = render(component);

        expect(container.innerHTML).toBe(missingResource);
    });

});
