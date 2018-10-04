# Select.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| className | String |  | CSS class for Select component from react-select |
| options | Array |  | options for Select component from react-select |
| changed | func |  | options changed handler |
| defaultValue | String |  | sets the initial value of the search input |
| isSearchable | bool |  | add functionality of searching in search options |

### 

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/src/UI/Select/Select.js" %}
```javascript
import React from 'react';
import Select from 'react-select'; //https://github.com/JedWatson/react-select

import classes from './Select.css';

const select = (props) => {
    const colorStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                color: isSelected
                    ? "#000"
                    : isFocused ? "#000" : "#000",
                backgroundColor: isSelected
                    ? "#300356"
                    : isFocused ? "#7a5a94" : "#fff"
            }
        }
    }

    const classNames = [classes.Select, classes[props.className]].join(' ');
    
    return (
        <Select
            className={classNames}
            options={props.options}
            onChange={props.changed}
            defaultValue={props.defaultValue}
            isSearchable={props.isSearchable}
            styles={colorStyles}
        />
    );
}

export default select;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

