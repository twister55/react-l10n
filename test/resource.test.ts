'use strict';

import Resource from '../src/resource';
import ResourceContext from '../src/resource-context';

function getValue(resourceValue: string, data: object = {}) {
    const resource = new Resource(resourceValue);
    const context = new ResourceContext(data);

    return resource.tokens(context).join('');
}

describe('resource', () => {

    test('simple text', () => {
        expect(getValue('Hello world')).toBe('Hello world');
    });

    test('text with variables', () => {
        const resource = 'My name is {user.name}. I`m {user.age} years old';
        const data = {
            user: {
                name: 'Jon Doe',
                age: 30
            }
        };

        expect(getValue(resource, data)).toBe('My name is Jon Doe. I`m 30 years old');
    });

    test('text with variables with spaces', () => {
        const resource = 'My name is { user.name }. I`m { user.age} years old';
        const data = {
            user: {
                name: 'Jon Doe',
                age: 30
            }
        };

        expect(getValue(resource, data)).toBe('My name is Jon Doe. I`m 30 years old');
    });

    test('switch', () => {
        const resource = 'User from {code ? RUS={Russia} F= {France} D ={Germany} I = {Italy}}';

        expect(getValue(resource, { code: 'RUS' })).toBe('User from Russia');
        expect(getValue(resource, { code: 'F'   })).toBe('User from France');
        expect(getValue(resource, { code: 'D'   })).toBe('User from Germany');
        expect(getValue(resource, { code: 'I'   })).toBe('User from Italy');
    });

    test('if condition', () => {
        const resource = '{ loggedIn ? {Login} : {Logout} }';

        expect(getValue(resource, { loggedIn: true })).toBe('Login');
        expect(getValue(resource, { loggedIn: false })).toBe('Logout');
    });

    test('switch with variables in cases', () => {
        const resource = '{name} was born in { year }{city ? { in {city} city} }';
        const dataWithCity = {
            name: 'Jon Doe',
            year: 1991,
            city: 'New York'
        };
        const dataWithNoCity = {
            ...dataWithCity,
            city: null
        };

        expect(getValue(resource, dataWithCity)).toBe('Jon Doe was born in 1991 in New York city');
        expect(getValue(resource, dataWithNoCity)).toBe('Jon Doe was born in 1991');
    });

});
