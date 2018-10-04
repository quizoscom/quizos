# timer.js

### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| hr | Number | 0 | hour variable for timer |
| mins | Number | 0 | minutes variable for timer |
| secs | Number | 0 | seconds variable for timer |
| stopTimer | bool | false | stop timer flag |



### action types

| name | descriptoin |
| :--- | :--- |
| TIMER\_RUNNING | update hr, mins and secs to action params and stopTimer to false |
| TIMER\_STOPPED | update hr, mins and secs to action params and stopTimer to true |





### code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/timer.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    hr: 0,
    mins: 0,
    secs: 0,
    stopTimer: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TIMER_RUNNING:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: false });
        case actionTypes.TIMER_STOPPED:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: true });
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

