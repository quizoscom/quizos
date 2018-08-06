import * as actionTypes from './actionTypes';

export const showAlertAction = (alertMsg, alertType) => {
    return {
        type: actionTypes.SHOW_ALERT,
        alertMsg: alertMsg,
        alertType: alertType
    };
};

export const hideAlertAction = () => {
    return {
        type: actionTypes.HIDE_ALERT
    };
};

export const showAlert = (alertMsg, alertType) => {
    return dispatch => {
        dispatch(showAlertAction(alertMsg, alertType));
    }
}

export const hideAlert = () => {
    return dispatch => {
        dispatch(hideAlertAction());
    }
}