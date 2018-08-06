import * as actionTypes from './actionTypes';

export const showConfirmAction = (confirmMsg) => {
    return {
        type: actionTypes.SHOW_CONFIRM,
        confirmMsg: confirmMsg
    }
}

export const hideConfirmAction = () => {
    return {
        type: actionTypes.HIDE_CONFRIM
    }
}

export const okClickedAction = (okClicked) => {
    return {
        type: actionTypes.OK_CLICKED,
        okClicked: okClicked
    }
}

export const showConfirm = (confirmMsg) => {
    return dispatch => {
        dispatch(showConfirmAction(confirmMsg));
    }
}

export const hideConfirm = () => {
    return dispatch => {
        dispatch(hideConfirmAction());
    }
}

export const okClicked = (okClicked) => {
    return dispatch => {
        dispatch(okClickedAction(okClicked));
    }
}