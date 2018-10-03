# Input.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| className | String |  | CSS class for input |
| inputType | String |  | value for type attribute of input tag |
| value | String |  | input value |
| changed | func |  | input changed handler |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/Input/Input.js" %}
```javascript
import React from 'react';
import classes from './Input.css';

const input = props => {
    const classNames = [classes.Input, classes[props.className]].join(' ');
    return (
        <input 
            onChange={props.changed} 
            type={props.inputType} 
            className={classNames} 
            value={props.value}
        />
    );
}

export default input;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

