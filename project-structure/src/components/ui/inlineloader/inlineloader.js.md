# InlineLoader.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| style | Object | { } | inline CSS style |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/InlineLoader/InlineLoader.js" %}
```javascript
import React from 'react';

import classes from './InlineLoader.css';

const inlineLoader = props => (
    <div className={classes.InlineLoader} style={props.style}>
        <p>Loading...</p>
        <div className={classes.Loader}></div>
    </div>
);

export default inlineLoader;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

