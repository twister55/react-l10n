'use strict';

import Token from './token';
import ResourceContext from '../resource-context';
import SwitchToken from "./switch-token";

export default class IfConditionToken extends SwitchToken {

    constructor(expression = '', cases: Array<Token[]> = []) {
        super(expression, {
            true: cases[0],
            false: cases[1]
        });
    }

    protected getTokens(ctx: ResourceContext) {
        return this.cases[String(!!ctx.getValue(this.expression))];
    }

}
