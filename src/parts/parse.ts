'use strict';

import Part from './part';
import TextPart from './text-part';
import ValuePart from './value-part';

function readUntil(resource: string, start: number, char: string) {
    for (let i = start; i < resource.length; i++) {
        if (char === resource[i]) {
            return i;
        }
    }

    return -1;
}

function nextPart(parts: Part[], resource: string, start: number): number {
    let i = readUntil(resource, start, '{');

    if (i > start) {
        parts.push(new TextPart(resource.substr(start, i - start)));

        return i;
    }

    if (i === -1) {
        parts.push(new TextPart(resource.substr(start)));

        return resource.length;
    }

    if (resource[i] === '{') {
        start = i + 1;
        i = readUntil(resource, start, '}');

        if (i > -1 && resource[i] === '}') {
            parts.push(new ValuePart(resource.substr(start, i - start)));

            return i + 1;
        }

        parts.push(new TextPart(resource.substr(start)));

        return resource.length;
    }

    return i;
}

function parse(parts: Part[], resource: string): void {
    let start = 0;

    while (true) {
        let i = nextPart(parts, resource, start);

        if (i === resource.length) {
            break;
        }

        if (start === i) {
            i++;
        }

        start = i;
    }
}

export default function (resource: string): Part[] {
    const parts: Part[] = [];

    parse(parts, resource);

    return parts;
}
