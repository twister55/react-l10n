'use strict';

function getValue(part: string, source: any): any {
    if (part) {
        const matches = part.match(/(.*?)\[(.*?)\]/);

        if (matches) {
            const array = source[matches[1]];

            return array && array[matches[2]];
        }

        if (source instanceof Map) {
            return source.get(part);
        }

        return source[part];
    }

    return undefined;
}

export default function(key: string, source: object) {
    let result = undefined;
    let keyParts = key.split('.');

    if (keyParts.length === 1) {
        result = getValue(keyParts[0], source);
    } else {
        for (let idx = 0; idx < keyParts.length; idx++) {
            result = getValue(keyParts[idx], result || source);

            if (!result) {
                break;
            }
        }
    }

    return result;
}
