# Loader.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| loaderStyle |  |  |  |
| loader2Style |  |  |  |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/Loader/Loader.js" %}
```javascript
import React from 'react';

import classes from './Loader.css';

const loader = props => (
    <div className={classes.LoaderCont}>
        <p className={classes.LoadingP}>Loading</p>
        <div className={classes.Parent}>
            <div className={classes.Loader} style={props.loaderStyle}></div>
            <div className={classes.Loader2} style={props.loader2Style}></div>
        </div>
    </div>
);

export default loader;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

