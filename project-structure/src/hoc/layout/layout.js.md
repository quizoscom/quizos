---
description: Wrapping container component for all routes
---

# Layout.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| isAuth | bool | false | user is logged in or not |
| isQuizActive | bool | false | check whether quiz is active |



### code

{% code-tabs %}
{% code-tabs-item title="/src/hoc/Layout/Layout.js" %}
```javascript
import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import classes from './Layout.css';

const layout = props => (
    <div id="outer-container">
        <Toolbar isAuth={props.isAuth} isQuizActive={props.isQuizActive} />
        { !props.isQuizActive ? <Sidebar isAuth={props.isAuth} isQuizActive={props.isQuizActive} /> : null }
        <main className={classes.Content} id="page-wrap">
            {props.children}
        </main>
    </div>
);

export default layout
```
{% endcode-tabs-item %}
{% endcode-tabs %}

