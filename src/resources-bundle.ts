'use strict';

import Resource from './resource';

export default class ResourcesBundle {
    private readonly resources: object;

    constructor(resources?: object) {
        this.resources = {};

        this.parse(resources);
    }

    get(id: string): Resource|null {
        const resource = this.resources[id];

        if (resource) {
            if (typeof resource === 'string') {
                this.resources[id] = new Resource(resource);
            }

            return this.resources[id];
        }

        return null;
    }

    private parse(resources?: object, prefix?: string): void {
        if (resources) {
            for (let key in resources) {
                if (resources.hasOwnProperty(key)) {
                    const id = prefix ? `${prefix}.${key}`: key;
                    const value = resources[key];

                    if (Array.isArray(value)) {
                        value.forEach((resource, index) => {
                            this.resources[`${id}[${index}]`] = resource;
                        });
                    } else if (typeof value === 'object') {
                        this.parse(value, id);
                    } else {
                        this.resources[id] = value;
                    }
                }
            }
        }
    }
}
