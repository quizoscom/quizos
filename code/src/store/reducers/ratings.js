import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_RATINGS_AND_REVIEW:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.SAVE_RATINGS_AND_REVIEW_SUCCESS:
            return updateObject(state, { loading: false, error: null });
        case actionTypes.SAVE_RATINGS_AND_REVIEW_FAILED:
            return updateObject(state, { loading: false, error: action.error });
        default:
            return state;
    }
}

export default reducer;