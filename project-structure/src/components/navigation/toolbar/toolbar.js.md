# Toolbar.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| isQuizActive | bool | false | to send to NavigationItems |
| isAuth | bool | false | to send to NavigationItems |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/Navigation/Toolbar/Toolbar.js" %}
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../../assets/logo-with-text.png';

import Navigationitems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to="/"><img src={Logo} alt="Evaluiz"/></Link>
        </div>
        <nav className={classes.Nav}>
            <Navigationitems isAuth={props.isAuth} isQuizActive={props.isQuizActive} />
        </nav>
    </header>
);

export default toolbar;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

