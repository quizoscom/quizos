import * as actionTypes from './actionTypes';

export const timerRunningAction = (hr, mins, secs) => {
    return {
        type: actionTypes.TIMER_RUNNING,
        hr: hr,
        mins: mins,
        secs: secs
    }
}

export const timerRunning = (hr, mins, secs) => {
    return dispatch => {
        dispatch(timerRunningAction(hr, mins, secs));
    }
}

export const timerStoppedAction = (hr, mins, secs) => {
    return {
        type: actionTypes.TIMER_STOPPED,
        hr: hr,
        mins: mins,
        secs: secs
    }
}

export const timerStopped = (hr, mins, secs) => {
    return dispatch => {
        dispatch(timerStoppedAction(hr, mins, secs));
    }
}