'use strict';

import Token from './token';
import ResourceContext from '../resource-context';

export default class SwitchToken implements Token {
    protected readonly expression: string;
    protected readonly cases: { [key: string]: Token[] };

    static create(value: string, caseConditions: Array<string>, caseValues: Array<Token[]>) {
        let cases = {};

        for (let idx = 0; idx < caseConditions.length; idx++) {
            cases[caseConditions[idx].trim()] = caseValues[idx];
        }

        return new SwitchToken(value, cases);
    }

    constructor(expression = '', cases = {}) {
        this.expression = expression.trim();
        this.cases = cases;
    }

    apply(ctx: ResourceContext, results: []) {
        let tokens = this.getTokens(ctx);

        if (tokens) {
            tokens.forEach(token => token.apply(ctx, results));
        }
    }

    protected getTokens(ctx: ResourceContext): Token[] {
        return this.cases[ctx.getValue(this.expression)];
    }

}
