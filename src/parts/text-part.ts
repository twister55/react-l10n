'use strict';

import Part from './part';

export default class TextPart implements Part {
    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    getValue(): string {
        return this.text;
    }

}
