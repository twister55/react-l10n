import * as React from 'react';

export default React.createContext({
    localize: (key: string): string => key
});
