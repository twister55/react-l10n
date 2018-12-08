'use strict';

import Token from './token';
import TextToken from "./text-token";
import ValueToken from "./value-token";
import SwitchToken from './switch-token';
import IfConditionToken from './if-condition-token';

const QUESTION = '?';
const EQUAL = '=';
const SLASH = '\\';
const SPACE = ' ';
const OPENING_BRACKET = '{';
const CLOSING_BRACKET = '}';

export default class StringTokenizer {
    private readonly chars: string[];
    private start: number;
    private position: number;
    private length: number;

    static tokenize(chars: string[] = []): Token[] {
        const result: Token[] = [];
        const tokenizer = new StringTokenizer(chars);

        while(tokenizer.hasMoreTokens()) {
            result.push(tokenizer.nextToken());
        }

        return result;
    }

    private constructor(chars: string[] = []) {
        this.chars = chars;
        this.start = 0;
        this.position = 0;
        this.length = this.chars.length;
    }

    hasMoreTokens(): boolean {
        return this.hasNextChar();
    }

    nextToken(): Token {
        let token = null;

        if (this.current() === OPENING_BRACKET) {
            this.start = ++this.position; // shifting to start of expression (wo opening bracket)

            token = this.parseExpression();
        }

        if (token === null) {
            this.readUntilExpressionStart();

            if (!this.next()) {
                // случай когда в конце {
                this.position++;
            }

            token = new TextToken(this.substr());
        }

        this.start = this.position;

        return token;
    }

    private hasNextChar(): boolean {
        return this.position < this.length;
    }

    private current(): string {
        return this.chars[this.position];
    }

    private next(): string {
        return this.chars[this.position + 1];
    }

    private substr(start: number = -1): string {
        return this.slice(start).join('');
    }

    private slice(start: number = -1): string[] {
        return this.chars.slice(start > -1 ? start : this.start, this.position)
    }

    private parseExpression(): Token {
        let value = '';
        let caseConditions: Array<string> = [];
        let caseValues: Array<Token[]> = [];
        let isSwitch = false;
        let isIfCondition = false;
        let isExpressionFinished = false;

        while (this.position < this.length && !isExpressionFinished) {
            let current = this.current();

            if (current === SPACE) {
                this.position++;
                continue;
            }

            switch (current) {
                case QUESTION: { // value passed - switch started
                    value = this.substr();
                    this.start = this.position + 1;
                    isSwitch = true;
                    isIfCondition = true;
                    break;
                }

                case EQUAL: { // switch condition passed - next will be switch value
                    caseConditions.push(this.substr());
                    isIfCondition = false;
                    break;
                }

                case OPENING_BRACKET: { // start of switch condition value
                    let start = ++this.position;
                    this.readUntilExpressionEnd();
                    this.start = this.position + 1;
                    caseValues.push(StringTokenizer.tokenize(this.slice(start)));
                    break;
                }

                case CLOSING_BRACKET: { // end of expression
                    if (!isSwitch) {
                        value = this.substr();
                    }

                    isExpressionFinished = true;
                    break;
                }
            }

            this.position++;
        }

        if (isExpressionFinished) {
            if (isIfCondition && caseValues) {
                return new IfConditionToken(value, caseValues);
            }

            if (isSwitch && caseConditions && caseValues) {
                return SwitchToken.create(value, caseConditions, caseValues);
            }

            return new ValueToken(value);
        }

        return new TextToken(value);
    }

    private readUntilExpressionStart() {
        this.readUntil(current => current === OPENING_BRACKET);
    }

    private readUntilExpressionEnd() {
        let openBrackets = 0;

        this.readUntil(current => {
            if (current === OPENING_BRACKET) {
                openBrackets++;
            } else if (current === CLOSING_BRACKET) {
                if (openBrackets) {
                    openBrackets--;
                } else {
                    return true;
                }
            }

            return false;
        });
    }

    private readUntil(predicate: ReadPredicate) {
        let escaped = false;

        while (this.hasNextChar()) {
            let current = this.current();

            if (current === SLASH) {
                const next = this.next();

                if (next === SLASH || next === OPENING_BRACKET) {
                    this.chars.splice(this.position, 1);
                    this.length--;
                    escaped = true;
                    continue;
                }
            }

            if (!escaped && predicate(current)) {
                break;
            }

            escaped = false;
            this.position++;
        }
    }

}

interface ReadPredicate {
    (current: string): boolean;
}
