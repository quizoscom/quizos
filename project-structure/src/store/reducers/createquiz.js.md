# createQuiz.js

### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| shareLink | String |  | share link string for user to share their quiz |
| loading | bool | false | loading flag while creating quiz |
| languagesOptions | Array | \[ \] | languages list fetched from database while creating quiz |
| error | String | null | Any error occurrence while creating quiz |
| resetQuestionsRelatedState | bool | false | reset questions data flag after quiz complete or quiz completion quit |



### action types

| name | description |
| :--- | :--- |
| CREATE\_QUIZ | set loading to true |
| CREATE\_QUIZ\_SUCCESS | set loading false, shareLink to action param, quizId to action param, and resetQuestionsRelatedState true |
| CREATE\_QUIZ\_FAILED | set loading false and error to action param |
| LOAD\_LANGUAGES | loading true and error null |
| LOAD\_LANGUAGES\_SUCCESS | loading false, languagesOptions to action param which is fetched from the database and error to null |
| LOAD\_LANGUAGES\_FAILED | loading false, error to action param and languagesOptions to empty Array |
| RESET\_QUESTIONS\_RELATED\_STATE | set resetQuestionsRelatedState to action param |



###  code

{% code-tabs %}
{% code-tabs-item title="/src/store/reducers/createQuiz.js" %}
```javascript
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shareLink: '',
    loading: false,
    languagesOptions: [],
    error: null,
    resetQuestionsRelatedState: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_QUIZ:
            return updateObject(state, { loading: true });
        case actionTypes.CREATE_QUIZ_SUCCESS:
            return updateObject(state, { loading: false, shareLink: action.shareLink, quizId: action.quizId, resetQuestionsRelatedState: true});
        case actionTypes.CREATE_QUIZ_FAILED:
            return updateObject(state, { loading: false, error: action.error});
        case actionTypes.LOAD_LANGUAGES:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.LOAD_LANGUAGES_SUCCESS:
            return updateObject(state, { loading: false, languagesOptions: action.languagesOptions, error: null });
        case actionTypes.LOAD_LANGUAGES_FAILED:
            return updateObject(state, { loading: false, error: action.error, languagesOptions: [] });
        case actionTypes.RESET_QUESTIONS_RELATED_STATE:
            return updateObject(state, { resetQuestionsRelatedState: action.resetVal });
        default:
            return state;
    }
}

export default reducer;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

