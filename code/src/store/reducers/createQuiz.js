import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shareLink: '',
    loading: false,
    languagesOptions: [
        { value: "select", label: "Select"},
        { value: "react", label: "React"},
        { value: "redux", label: "Redux"},
        { value: "javaScript", label: "JavaScript"},
        { value: "php", label: "PHP"},
        { value: "python", label: "Python"},
    ],
    error: null,
    resetQuestionsRelatedState: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_QUIZ:
            return updateObject(state, { loading: true });
        case actionTypes.CREATE_QUIZ_SUCCESS:
            return updateObject(state, { loading: false, shareLink: action.shareLink, quizId: action.quizId, resetQuestionsRelatedState: 1});
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