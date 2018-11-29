import * as React from 'react';

export default React.createContext({
    localize: (id: string): string => id
});
