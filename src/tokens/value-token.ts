'use strict';

import Token from './token';
import ResourceContext from '../resource-context';

export default class ValueToken implements Token {
    private readonly expression: string;

    constructor(expression = '') {
        this.expression = expression.trim();
    }

    apply(ctx: ResourceContext, results: Array<string>) {
        results.push(ctx.getValue(this.expression));
    }

}
