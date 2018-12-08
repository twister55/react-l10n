'use strict';

import Token from './token';
import StringTokenizer from './string-tokenizer';

export {
    Token
}

export default function (string: string = ''): Token[] {
    return StringTokenizer.tokenize(string.split(''));
}

