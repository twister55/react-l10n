'use strict';

import Token from './token';
import ResourceContext from '../resource-context';

export default class TextToken implements Token {
    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    apply(ctx: ResourceContext, results: Array<string>) {
        results.push(this.text);
    }

}
