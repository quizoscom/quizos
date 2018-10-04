---
description: alert actions
---

# alert.js

### actions

| name | params | description |
| :--- | :--- | :--- |
| showAlertAction | alertMsg, alertType | call SHOW\_ALERT action types |
| hideAlertAction |  | call HIDE\_ALERT action types |
| showAlert | alertMsg, alertType | dispatch showAlertAction |
| hideAlert |  | dispatch hideAlertAction |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/alert.js" %}
```javascript
import * as actionTypes from './actionTypes';

export const showAlertAction = (alertMsg, alertType) => {
    return {
        type: actionTypes.SHOW_ALERT,
        alertMsg: alertMsg,
        alertType: alertType
    };
};

export const hideAlertAction = () => {
    return {
        type: actionTypes.HIDE_ALERT
    };
};

export const showAlert = (alertMsg, alertType) => {
    return dispatch => {
        dispatch(showAlertAction(alertMsg, alertType));
    }
}

export const hideAlert = () => {
    return dispatch => {
        dispatch(hideAlertAction());
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

