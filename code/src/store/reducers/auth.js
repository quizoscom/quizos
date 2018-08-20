import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; 

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    newUser: 0,
    forgotPassword: 0,
    linkSent: 0,
    passwordChanged: 0,
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
        case actionTypes.FORGOT_PASSWORD:
            return updateObject(state, { forgotPassword: 1, linkSent: 0 });
        case actionTypes.BACK_TO_LOGIN:
            return updateObject(state, { forgotPassword: 0, linkSent: 0, error: null, loading: false });
        case actionTypes.PASSWORD_RESET_LINK_SENT:
            return updateObject(state, { loading: true });
        case actionTypes.PASSWORD_RESET_LINK_SENT_SUCCESS:
            return updateObject(state, { forgotPassword: 0, linkSent: 1, error: null, loading: false });
        case actionTypes.PASSWORD_RESET_LINK_SENT_FAILED:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.CHANGE_PASSWORD:
            return updateObject(state, { loading: true });
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return updateObject(state, { error: null, loading: false, passwordChanged: 1 });
        case actionTypes.CHANGE_PASSWORD_FAILED:
            return updateObject(state, { error: action.error, loading: false });
        case actionTypes.CHANGE_PASSWORD_RESET_STATES:
            return updateObject(state, { error: null, loading: false, forgotPassword: 0, linkSent: 0, passwordChanged: 0 });
        default:
            return state;
    }
}

export default reducer;