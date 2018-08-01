import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shareLink: '',
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_QUIZ:
            return updateObject(state, { loading: true });
        case actionTypes.CREATE_QUIZ_SUCCESS:
            return updateObject(state, { loading: false, shareLink: action.shareLink, quizId: action.quizId });
        case actionTypes.CREATE_QUIZ_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        default:
            return state;
    }
}

export default reducer;