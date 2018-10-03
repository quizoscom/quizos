---
description: stateless component for input with label used in Auth
---

# FormField.js

{% hint style="info" %}
functional component
{% endhint %}

### 

### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| label | String | \* | label text above input |
| formFieldType | String | \* | input type\(eg. text, password, etc.\) |
| value | String |  | input value |
| changed | func |  | input changed handler |

### 

### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/FormField/FormField.js)

{% code-tabs %}
{% code-tabs-item title="/src/components/FormField/FormField.js" %}
```javascript
import React from 'react';

import classes from './FormField.css';
import Input from '../UI/Input/Input';

const formField = (props) => (
    <div className={classes.FormField}>
        <label>{props.label}</label>
        <Input 
            inputType={props.formFieldType} 
            changed={props.changed} 
            value={props.value}
        />
    </div>
);

export default formField

```
{% endcode-tabs-item %}
{% endcode-tabs %}

