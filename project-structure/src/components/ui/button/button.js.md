# Button.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| disabled | bool | false | button disabled or not |
| btnType | String |  | styling based on button type \(eg. cta buttons, etc.\) |
| className | String |  | CSS class for button |
| style | Object | { } | CSS style object for button |
| clicked | func |  | button clicked handler |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/Button/Button.js" %}
```javascript
import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const disabled = props.disabled === true ? "disabled" : null
    const classNames = [classes.Button, classes[props.btnType], classes[props.className]].join(' ');
    return (
        <button 
            style={props.style} 
            className={classNames} 
            onClick={props.clicked !== undefined ? props.clicked : null}
            disabled={disabled}
        >{props.children}</button>
    );
}

export default button;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

