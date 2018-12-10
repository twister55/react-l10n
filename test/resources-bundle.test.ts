'use strict';

import ResourcesBundle from '../src/bundle';
import Resource from '../src/resource';
import ResourceContext from '../src/resource-context';

const ctx = new ResourceContext();

function getValue(resource: Resource|null) {
    return resource && resource.tokens(ctx).join('');
}

describe('bundle', () => {

    test('simple object', () => {
        const bundle = new ResourcesBundle({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value4'
        });

        expect(getValue(bundle.get('key1'))).toBe('value1');
        expect(getValue(bundle.get('key2'))).toBe('value2');
        expect(getValue(bundle.get('key3'))).toBe('value3');
        expect(getValue(bundle.get('key4'))).toBe('value4');
        expect(bundle.get('key5')).toBeNull();
    });

    test('nested objects', () => {
        const bundle = new ResourcesBundle({
            key1: {
                subkey1: 'value11',
                subkey2: 'value12'
            },
            key2: {
                subkey21: {
                    subkey212: {
                        subkey2121: 'value',
                        subkey2122: 'value1'
                    },
                    subkey23: 'value23'
                }
            },
            key3: {
                1: 'value31',
                true: 'value3true'
            },
            key4: ['value40', 'value41', 'value42']
        });

        expect(getValue(bundle.get('key1.subkey1'))).toBe('value11');
        expect(getValue(bundle.get('key1.subkey2'))).toBe('value12');
        expect(getValue(bundle.get('key2.subkey21.subkey212.subkey2121'))).toBe('value');
        expect(getValue(bundle.get('key2.subkey21.subkey212.subkey2122'))).toBe('value1');
        expect(getValue(bundle.get('key2.subkey21.subkey23'))).toBe('value23');
        expect(getValue(bundle.get('key3.1'))).toBe('value31');
        expect(getValue(bundle.get('key3.true'))).toBe('value3true');
        expect(getValue(bundle.get('key4[0]'))).toBe('value40');
        expect(getValue(bundle.get('key4[2]'))).toBe('value42');
        expect(bundle.get('key4.3')).toBeNull();
    });

});
