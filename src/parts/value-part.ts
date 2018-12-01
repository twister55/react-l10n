'use strict';

import Part from './part';

export default class ValuePart implements Part {
    private readonly parts: string[];

    constructor(expression = '') {
        this.parts = expression.trim().split('.');
    }

    getValue(data: object): any {
        let result = data;

        for (let idx = 0; idx < this.parts.length; idx++) {
            result = ValuePart.getValue0(this.parts[idx], result);

            if (!result) {
                break;
            }
        }

        return result === data ? undefined : result;
    }

    private static getValue0(part: string, source: any): any {
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
}
