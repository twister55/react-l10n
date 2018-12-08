'use strict';

import ResourceContext from '../resource-context';

export default interface Token {

    apply(ctx: ResourceContext, results: []): void;

}
