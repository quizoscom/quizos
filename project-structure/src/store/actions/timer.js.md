# timer.js

### actions

| name | params | description |
| :--- | :--- | :--- |
| timerRunningAction | hr, mins, secs | call TIMER\_RUNNING |
| timerRunning | hr, mins, secs | dispatch timerRunningAction |
| timerStoppedAction | hr, mins, secs | call TIMER\_STOPPED |
| timerStopped | hr, mins, secs | dispatch timerStoppedAction |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/timer.js" %}
```javascript
import * as actionTypes from './actionTypes';

export const timerRunningAction = (hr, mins, secs) => {
    return {
        type: actionTypes.TIMER_RUNNING,
        hr: hr,
        mins: mins,
        secs: secs
    }
}

export const timerRunning = (hr, mins, secs) => {
    return dispatch => {
        dispatch(timerRunningAction(hr, mins, secs));
    }
}

export const timerStoppedAction = (hr, mins, secs) => {
    return {
        type: actionTypes.TIMER_STOPPED,
        hr: hr,
        mins: mins,
        secs: secs
    }
}

export const timerStopped = (hr, mins, secs) => {
    return dispatch => {
        dispatch(timerStoppedAction(hr, mins, secs));
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

