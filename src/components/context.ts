import * as React from 'react';

export default React.createContext({
    localize: (id: string, data: object): string => id
});
