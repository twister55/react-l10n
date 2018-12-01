'use strict';

import Bundle from '../src/bundle';

function expectValue(bundle: Bundle, id: string, value: string) {
    const resource = bundle.get(id);

    expect(resource && resource.getValue()).toBe(value);
}

describe('bundle', () => {

    test('simple object', () => {
        const bundle = new Bundle({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value4'
        });

        expectValue(bundle, 'key1', 'value1');
        expectValue(bundle, 'key2', 'value2');
        expectValue(bundle, 'key3', 'value3');
        expectValue(bundle, 'key4', 'value4');
        expect(bundle.get('key5')).toBeUndefined();
    });

    test('nested objects', () => {
        const bundle = new Bundle({
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

        expectValue(bundle, 'key1.subkey1', 'value11');
        expectValue(bundle, 'key1.subkey2', 'value12');
        expectValue(bundle, 'key2.subkey21.subkey212.subkey2121', 'value');
        expectValue(bundle, 'key2.subkey21.subkey212.subkey2122', 'value1');
        expectValue(bundle, 'key2.subkey21.subkey23', 'value23');
        expectValue(bundle, 'key3.1', 'value31');
        expectValue(bundle, 'key3.true', 'value3true');
        expectValue(bundle, 'key4.0', 'value40');
        expectValue(bundle, 'key4.2', 'value42');
        expect(bundle.get('key4.3')).toBeUndefined();
    });

});
