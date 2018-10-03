---
description: Question component to show text or input base on quiz status
---

# Question.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| className | String |  | CSS class for Question's wrapping div |
| viewer | bool | false | to decide whether user is taking or creating a quiz |
| changed | func |  | questions input changed handler while creating quiz |
| value | String |  | Questions input value while creating quiz |
| title | String | \* | Question's title while taking quiz |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/Question/Question.js" %}
```javascript
import React from 'react';

import classes from './Question.css';

import Input from '../UI/Input/Input';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const question = (props) => {
    let body = '';
    const classNames = [classes.Question, classes[props.className]].join(' ')
    if(!props.viewer) {
        body = (
            <Aux>
                <label>Question</label>
                <Input 
                    changed={props.changed} 
                    inputType="text"
                    value={props.value}
                ></Input>
            </Aux>
        )
    } else {
        body = <p className={classes.questionTitle}>{props.title}</p>
    }
    return (
        <div className={classNames}>
            {body}
        </div>
    );
}

export default question;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

