'use strict';

import ValuePart from "../src/parts/value-part";
import Resource from "../src/resource";

describe('resource', () => {

    describe('value part', () => {

        test('simple var access', () => {
            const part = new ValuePart('key');

            expect(part.getValue({ key: 1 })).toBe(1);
        });

        test('object key access', () => {
            const part = new ValuePart('user.name');
            const ctx = {
                user: {
                    name: 'Jon Doe'
                }
            };

            expect(part.getValue(ctx)).toBe(ctx.user.name);
        });

        test('array access', () => {
            const part = new ValuePart('users[0].name');
            const ctx = {
                users: [{
                    name: 'Jon Doe'
                }]
            };

            expect(part.getValue(ctx)).toBe(ctx.users[0].name);
        });

        test('undefined result', () => {
            const part = new ValuePart('users[0].name');
            const ctx = {
                user: {
                    name: 'Jon Doe'
                }
            };

            expect(part.getValue(ctx)).toBeUndefined();
        });

    });

    test('simple text', () => {
        const resource = new Resource('Hello world');

        expect(resource.getValue()).toBe('Hello world');
    });

    test('text with variables', () => {
        const resource = new Resource('My name is {user.name}. I`m {user.age} years old');
        const ctx = {
            user: {
                name: 'Jon Doe',
                age: 30
            }
        };

        expect(resource.getValue(ctx)).toBe('My name is Jon Doe. I`m 30 years old');
    });

});
