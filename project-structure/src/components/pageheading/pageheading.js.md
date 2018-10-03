# PageHeading.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| children | String | \* | heading text |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/PageHeading/PageHeading.js" %}
```javascript
import React from 'react';
import classes from './PageHeading.css';

const h2 = props => <h2 className={classes.H2}>{props.children}</h2>;

export default h2;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

