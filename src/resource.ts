'use strict';

import Part from './parts/part';
import parse from './parts/parse';

export default class Resource {
    private readonly parts: Part[];

    constructor(resource: string) {
        this.parts = parse(resource);
    }

    getParts(data = {}) {
        return this.parts.map(part => part.getValue(data));
    }

    getValue(data = {}) {
        return this.getParts(data).join('');
    }

}
