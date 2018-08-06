import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    alertMsg: '',
    alertType: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_ALERT:
            return updateObject(state, { alertMsg: action.alertMsg, alertType: action.alertType });
        case actionTypes.HIDE_ALERT:
            return updateObject(state, { alertMsg: '', alertType: '' });
        default:
            return state;
    }
}

export default reducer;