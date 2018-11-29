'use strict';

export default class Bundle {
    private readonly messages: object;

    constructor(messages?: object) {
        this.messages = {};

        this.parse(messages);
    }

    get(id: string, defaultMessage?: string): string|null {
        const message = this.messages[id];

        if (message) {
            return message;
        }

        if (defaultMessage) {
            return defaultMessage;
        }

        return null;
    }

    private parse(messages?: object, prefix?: string): void {
        if (messages) {
            for (let key in messages) {
                if (messages.hasOwnProperty(key)) {
                    const id = prefix ? `${prefix}.${key}`: key;
                    const value = messages[key];

                    if (typeof value === 'object') {
                        this.parse(value, id);
                    } else {
                        this.messages[id] = value;
                    }
                }
            }
        }
    }
}
