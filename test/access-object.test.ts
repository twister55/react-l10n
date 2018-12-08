'use strict';

import accessObject from "../src/utils/access-object";

test('access to object values', () => {
    const data = {
        key: 'value',
        user: {
            name: 'Jon Doe',
            age: 18
        },
        users: [{
            name: 'Jon Doe'
        }],
        data: new Map([['key1', 'value1'], ['key2', 'value2']])
    };

    expect(accessObject('key', data)).toBe(data.key);
    expect(accessObject('user.name', data)).toBe(data.user.name);
    expect(accessObject('user.age', data)).toBe(data.user.age);
    expect(accessObject('users[0].name', data)).toBe(data.users[0].name);
    expect(accessObject('data.key1', data)).toBe('value1');
    expect(accessObject('messages[0].text', data)).toBeUndefined();
});
