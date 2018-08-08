import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    newUser: 0,
    forgotPassword: 0,
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
            return updateObject(state, { newUser: 1 });
        default:
            return state;
    }
}

export default reducer;