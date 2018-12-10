'use strict';

import { ReactElement } from 'react';
import accessObject from './utils/access-object';

export type ChildrenIndex = {
    [key: string]: ReactElement<any>|undefined
};

export default class ResourceContext {
    private readonly data: object;
    private readonly children: ChildrenIndex;

    constructor(data: {} = {}, children: ChildrenIndex = {}) {
        this.data = data;
        this.children = children;
    }

    getValue(key: string) {
        let value = accessObject(key, this.data);

        if (!value) {
            value = this.children[key];
        }

        return value
    }

}
