# react-l10n

An localization library for [React](https://reactjs.org/).

## Installation

    npm install react-l10n

## Usage

The provider pattern is used to wrap your component and provide a localization object to child components. Wrap your component in a `LocalizationProvider` as follows:

```
import { render } from 'react-dom'
import { LocalizationProvider } from 'react-l10n'

import App from 'app'

const resources = {
    // localization resources
};

render(
    <LocalizationProvider resources={resources}>
        <App />
    </Localizer>
}
```
    
In child components you can gt access to resources as follows:

```
import React from 'react';
import LocalizedMessage from 'react-l10n';

export default function MyComponent() {
    return (
        <LocalizedMessage id='hello' />
    );
}    
```

### Resources bundle format

```
const resources = {
  'app.button.Submit': 'Submit',
  foo: {
    bar: 'Hey {user}, you must be %d years old?' // foo.bar
  },
  key: ['value 1', 'value 2', 'value 3'] // key[0], key[1], key[2]
};
```

### Dynamic translations

You can add dynamic content to your resources by inserting placeholders with the following format {placeholder}. Then using the `LocalizedMessage` component you will be able to pass in data that will inserted for each corresponding placeholder.

#### Using data attribute
     
```
import React from 'react';
import LocalizedMessage from 'react-l10n';

// resources = { greeting: 'Knock, knock, {user.name}' }
// user = { name: 'Neo' };

const Greeting = props => (
  <LocalizedMessage id='greeting' user={props.user} />
);

```

#### Using parts from React children

```
import React from 'react';
import LocalizedMessage from 'react-l10n';

// resources = { greeting: 'Knock, knock, {user}' }
// user = { name: 'Neo' };
const TextWithLink = props => (
  <LocalizedMessage id='greeting'>
    <a key='user' href='#'>{props.user.name}</a>
  </LocalizedMessage>
);

```

#### Switches and if conditions

See [tests](https://github.com/twister55/react-l10n/blob/master/test/resource.test.ts) for more information

```
import React from 'react';
import LocalizedMessage from 'react-l10n';

// resources = { greeting: 'User from {code ? RUS={Russia} F= {France} D ={Germany} I = {Italy}}' }
const TextWithLink = () => (
  <LocalizedMessage id='greeting' code='RUS'/>
);
// output: 'User from Russia'

```
