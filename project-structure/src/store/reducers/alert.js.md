---
description: alert reducers
---

# alert.js

### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| alertMsg | String | \* | alert message |
| alertType | String | \* | alert types like success, failed, warning |



### actionTypes

| name | description |
| :--- | :--- |
| SHOW\_ALERT | update alertMsg and alertType |
| HIDE\_ALERT | reset alertMsg and alertType to empty string |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/alert.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    alertMsg: '',
    alertType: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_ALERT:
            return updateObject(state, { alertMsg: action.alertMsg, alertType: action.alertType });
        case actionTypes.HIDE_ALERT:
            return updateObject(state, { alertMsg: '', alertType: '' });
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

