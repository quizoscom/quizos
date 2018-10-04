# NavigationItem.js

{% hint style="info" %}
functional component
{% endhint %}

### 

### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| className | String | empty String | CSS class for wrapping **li** tag |
| style | Object | { } | CSS style object for wrapping **li** tag |
| link | String | \* | relative path for the page on link click |
| git | bool | false | differentiate between project's github link & relative path |
| exact | bool | false | exact prop for NavLink from react-router-dom |

### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js)

{% code-tabs %}
{% code-tabs-item title="/src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js" %}
```javascript
import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    const classNames = [classes.NavigationItem, classes[props.className]].join(' ');
    return (
        <li className={classNames} style={props.style}>
            {
                props.git 
                ? <a className={classes.git} href={props.link}> {props.children} </a>
                : <NavLink exact={props.exact} to={props.link} activeClassName={classes.selected}> {props.children} </NavLink>
            }
        </li>
    );
}

export default navigationItem;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

