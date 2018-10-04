# confirm.js

### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| confirmMsg | String |  | confirm message to be shown when confirm dialog box is shown |
| okClicked | bool | false | ok button clicked flag |



### action types

| name | description |
| :--- | :--- |
| SHOW\_CONFIRM | update confirmMsg to action param |
| HIDE\_CONFRIM | reset confirmMsg to empty String |
| OK\_CLICKED | reset confirmMsg to empty String and set okClicked to action param |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/confirm.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    confirmMsg: '',
    okClicked: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_CONFIRM:
            return updateObject(state, { confirmMsg: action.confirmMsg });
        case actionTypes.HIDE_CONFRIM:
            return updateObject(state, { confirmMsg: '' });
        case actionTypes.OK_CLICKED:
            return updateObject(state, { confirmMsg: '', okClicked: action.okClicked });
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

