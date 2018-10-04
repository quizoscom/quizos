import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    hr: 0,
    mins: 0,
    secs: 0,
    stopTimer: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TIMER_RUNNING:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: false });
        case actionTypes.TIMER_STOPPED:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: true });
        default:
            return state;
    }
}

export default reducer;