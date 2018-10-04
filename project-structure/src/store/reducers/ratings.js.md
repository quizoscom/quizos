# ratings.js

### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| loading | bool | false | loading while rating a quiz after quiz completion |
| error | String | null | error occurrence while rating a quiz after it's completion |
| reviewGiven | bool | false | review has been successfully given flag |



### action types

| name | description |
| :--- | :--- |
| SAVE\_RATINGS\_AND\_REVIEW | update loading to true, error to null and reviewGiven to false |
| SAVE\_RATINGS\_AND\_REVIEW\_SUCCESS | loading to false, error to null and reviewGiven to true |
| SAVE\_RATINGS\_AND\_REVIEW\_FAILED | loading and reviewGiven false and error to action param |
| RESET\_RATINGS\_AND\_REVIEW\_STATES | reset loading and reviewGiven to false and error to null |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/ratings.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    reviewGiven: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_RATINGS_AND_REVIEW:
            return updateObject(state, { loading: true, error: null, reviewGiven: false });
        case actionTypes.SAVE_RATINGS_AND_REVIEW_SUCCESS:
            return updateObject(state, { loading: false, error: null, reviewGiven: true });
        case actionTypes.SAVE_RATINGS_AND_REVIEW_FAILED:
            return updateObject(state, { loading: false, error: action.error, reviewGiven: false });
        case actionTypes.RESET_RATINGS_AND_REVIEW_STATES:
            return updateObject(state, { loading: false, error: null, reviewGiven: false })
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

