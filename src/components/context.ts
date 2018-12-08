'use strict';

import * as React from 'react';
import { ChildrenIndex } from '../resource-context';

export default React.createContext({
    localize: (id: string, data: object, children: ChildrenIndex): string => id
});
