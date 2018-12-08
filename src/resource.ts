'use strict';

import tokenize, { Token } from './tokens';
import ResourceContext from './resource-context';

export default class Resource {
    private readonly _tokens: Token[];

    constructor(resource: string) {
        this._tokens = tokenize(resource);
    }

    tokens(ctx: ResourceContext): [] {
        const results: [] = [];

        this._tokens.forEach(token => token.apply(ctx, results));

        return results;
    }

}
