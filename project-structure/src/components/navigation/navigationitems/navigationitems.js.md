# NavigationItems.js

{% hint style="info" %}
functional component
{% endhint %}

### 

### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| isQuizActive | bool | false | show or hide the menubar links according to the quiz state \(active or inactive\) |
| isAuth | bool | false | user is logged in or not |

### 

### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/Navigation/NavigationItems/NavigationItems.js)

{% code-tabs %}
{% code-tabs-item title="/src/components/Navigation/NavigationItems/NavigationItems.js" %}
```javascript
import React from 'react';

import classes from './NavigationItems.css';
import githubIcon from '../../../assets/git-icon.png' 

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let body = null;
    if(!props.isQuizActive) {
        if(props.isAuth) {
            body = (
                <Aux>
                    <NavigationItem className="onlyDesktop" link="/dashboard">Dashboard</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/create-quiz">Create Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/available-quizzes">Take Quiz</NavigationItem>
                    <NavigationItem className="onlyDesktop" link="/logout">Logout</NavigationItem>
                </Aux>
            );
        } else {
            body = <NavigationItem className="onlyDesktop" link="/auth">Login</NavigationItem>;
        }
    }

    let dom = null;
    if(!props.isQuizActive) {
        dom = (
            <Aux>
                <NavigationItem exact className="onlyDesktop" link="/">Home</NavigationItem>
                {body}
                <NavigationItem git link="https://github.com/entrepaman/quiz-creator" className="gitLink"><img className={classes.Img} src={githubIcon} alt="Git Link"/></NavigationItem>
            </Aux>
        );
    } else {
        dom = body;
    }
    return (
        <ul className={classes.NavigationItems}>
            {dom}
        </ul>
    );
};

export default navigationItems;
```
{% endcode-tabs-item %}
{% endcode-tabs %}



