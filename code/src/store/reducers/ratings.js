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