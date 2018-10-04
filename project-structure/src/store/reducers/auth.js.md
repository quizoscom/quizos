# auth.js

## state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| token | String | null | user token fetched from firebase auth rest api google auth |
| userId | String | null | userId fetched from firebase or google |
| loading | bool | false | loading flag while interacting with server in Auth |
| error | String | null | Any error occurrence in Auth |
| newUser | bool | false | new user check flag |
| forgotPassword | bool | false | forgot password click check flag |
| linkSent | bool | false | link sent flag after forgot password button clicked |
| passwordChanged | bool | false | password changed success flag |
| redirectPath | String | "/" | state to manage user redirect path from root to /create-quiz or /available-quiz, if not logged in it is set to /auth |



### action types

| name | description |
| :--- | :--- |
| AUTH\_START | set error to null and loading to true |
| AUTH\_SUCCESS | set token, userId, error to null and loading to false |
| AUTH\_FAILED | set error to action param error and loading to false |
| AUTH\_LOG\_OUT | set token, userId, error to null and redirectPath to root |
| SET\_REDIRECT\_PATH | update redirect path according to the action param |
| NEW\_USER | update newUser to true |
| FORGOT\_PASSWORD | update forgotPassword to true and linkSent false |
| BACK\_TO\_LOGIN | update forgotPassword, linkSent and loading to false and error to null |
| PASSWORD\_RESET\_LINK\_SENT | loading true |
| PASSWORD\_RESET\_LINK\_SENT\_SUCCESS | forgotPassword and loading to false, linkSent to true, and error to null |
| PASSWORD\_RESET\_LINK\_SENT\_FAILED | error to action error and loading to false |
| CHANGE\_PASSWORD | loading true |
| CHANGE\_PASSWORD\_SUCCESS | error null, loading false and passwordChanged to true |
| CHANGE\_PASSWORD\_FAILED | error to action error and loading false |
| CHANGE\_PASSWORD\_RESET\_STATES | reset error, loading, forgotPassword, linkSent, passwordChanged |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/auth.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    newUser: false,
    forgotPassword: false,
    linkSent: false,
    passwordChanged: false,
    redirectPath: "/"
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { token: action.idToken, userId: action.userId, error: null, loading: false });
        case actionTypes.AUTH_FAILED:
            return updateObject(state, { error: action.error, loading: false });
        case actionTypes.AUTH_LOG_OUT:
            return updateObject(state, { token: null, userId: null, error: null, redirectPath: "/" });
        case actionTypes.SET_REDIRECT_PATH:
            return updateObject(state, { redirectPath: action.redirectPath });
        case actionTypes.NEW_USER:
            return updateObject(state, { newUser: true });
        case actionTypes.FORGOT_PASSWORD:
            return updateObject(state, { forgotPassword: true, linkSent: false });
        case actionTypes.BACK_TO_LOGIN:
            return updateObject(state, { forgotPassword: false, linkSent: false, error: null, loading: false });
        case actionTypes.PASSWORD_RESET_LINK_SENT:
            return updateObject(state, { loading: true });
        case actionTypes.PASSWORD_RESET_LINK_SENT_SUCCESS:
            return updateObject(state, { forgotPassword: false, linkSent: true, error: null, loading: false });
        case actionTypes.PASSWORD_RESET_LINK_SENT_FAILED:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.CHANGE_PASSWORD:
            return updateObject(state, { loading: true });
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return updateObject(state, { error: null, loading: false, passwordChanged: true });
        case actionTypes.CHANGE_PASSWORD_FAILED:
            return updateObject(state, { error: action.error, loading: false });
        case actionTypes.CHANGE_PASSWORD_RESET_STATES:
            return updateObject(state, { error: null, loading: false, forgotPassword: false, linkSent: false, passwordChanged: false });
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}



