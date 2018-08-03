import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    hr: 0,
    mins: 0,
    secs: 0,
    stopTimer: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TIMER_RUNNING:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: 0 });
        case actionTypes.TIMER_STOPPED:
            return updateObject(state, { hr: action.hr, mins: action.mins, secs: action.secs, stopTimer: 1 });
        default:
            return state;
    }
}

export default reducer;