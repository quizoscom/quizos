---
description: auth actions
---

# auth.js

### actions

| name | params | description |
| :--- | :--- | :--- |
| authStart |  | call actiontype AUTH\_START |
| authSuccess | token, userId | call actiontype AUTH\_SUCCESS |
| authFailed | error | call actiontype AUTH\_FAILED |
| authFailedAction | error | dispatch authFailed |
| auth | email, password, register, medium | dispatch authStart and register or login based on register value |
| googleLogin | email, userId, token, expiresIn | register using google login |
| authCheckState |  | logout if expiry time saved in local storage is less then current time |
| setRedirectPath |  | call actiontype SET\_REDIRECT\_PATH |
| redirectPath |  | dispatch setRedirectPath |
| onLogOut |  | call actiontype AUTH\_LOG\_OUT |
| logOut |  | remove local storage auth data and dispatch onLogOut |
| setNewUserAction |  | call actiontype NEW\_USER |
| setNewUser |  | dispatch setNewUserAction |
| forgotPasswordLinkClickAction |  | call actiontype FORGOT\_PASSWORD |
| forgotPasswordLinkClick |  | dispatch forgotPasswordLinkClickAction |
| backToLoginClickAction |  | call BACK\_TO\_LOGIN |
| backToLoginClick |  | dispatch backToLoginClickAction |
| sendLinkAction | email | call PASSWORD\_RESET\_LINK\_SENT |
| sendLink | email | check email exists or not and if yes call firebase to send password reset email link to the passed email and dispatch sendLinkAction  |
| sendLinkFailedAction | error | call actiontype PASSWORD\_RESET\_LINK\_SENT\_FAILED |
| sendLinkSuccessAction |  | call actiontype PASSWORD\_RESET\_LINK\_SENT\_SUCCESS |
| changePasswordAction |  | call actiontype CHANGE\_PASSWORD |
| changePassword | password, medium, oobCode | update user password using firebase auth rest api |
| changedPasswordSuccessAction |  | call actiontype CHANGE\_PASSWORD\_SUCCESS |
| changedPasswordSuccess |  | dispatch changedPasswordSuccessAction |
| changedPasswordFailedAction | error | call actiontype CHANGE\_PASSWORD\_FAILED |
| changedPassswordResetStatesAction |  | call actiontype CHANGE\_PASSWORD\_RESET\_STATES |
| changedPassswordResetStates |  | dispatch changedPassswordResetStatesAction |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/auth.js" %}
```javascript
import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';
import { SERVER_ROOT_URL, FIREBASE_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';

export const API_KEY="AIzaSyB04gE4c2KLcZsOwDM8JhAQx1AJQ37OwWo";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = error => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authFailedAction = error => {
    return dispatch => {
        dispatch(authFailed(error));
    }
}

export const auth = (email, password, register, medium) => {
    return dispatch => {
        dispatch(authStart());
        if(register) {
            // register a user with email and password using firebase authentication
            axios.post(`${FIREBASE_ROOT_URL}signupNewUser?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                const params = {
                    email: email,
                    token: res.data.idToken,
                    userId: res.data.localId,
                    medium: medium
                }

                axios.post(`${SERVER_ROOT_URL}/auth/auth.php`, qs.stringify(params))
                .then(response => {
                    if(response.data.status === 'success') {
                        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                        localStorage.setItem('token', res.data.idToken);
                        localStorage.setItem('userId', res.data.localId);
                        localStorage.setItem('expirationTime', expirationTime);
                        dispatch(authSuccess(res.data.idToken, res.data.localId));
                    } else {
                        console.log(response.data);
                        if(response.data.msg === 'email exists') {
                            dispatch(authFailed('Either the email exists or you had used Google Login'));
                        } else {
                            dispatch(authFailed(SERVER_ERROR_MSG));
                        }
                    }
                })
                .catch(error => {
                    dispatch(authFailed(SERVER_ERROR_MSG));
                });
            })
            .catch(err => {
                if(err.response.data.error.message === "EMAIL_EXISTS") {
                    dispatch(authFailed('Either the email exists or you had used Google Login'));
                } else {
                    dispatch(authFailed(err.response.data.error.message.replace(/_/ig, ' ')));
                }
            });
        } else {
            // login a user with email and password using firebase authentication
            axios.post(`${FIREBASE_ROOT_URL}verifyPassword?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error.message.replace(/_/ig, ' ')));
            });
        }
    };
};

export const googleLogin = (email, userId, token, expiresIn) => {
    return dispatch => {
        axios.post(`${SERVER_ROOT_URL}/auth/auth.php`, qs.stringify({
            email: email,
            token: token,
            userId: userId,
            medium: 'google'
        }))
        .then(response => {
            if(response.data.status === 'success') {
                axios.post(`${FIREBASE_ROOT_URL}deleteAccount?key=${API_KEY}`, {
                    idToken: response.data.token
                })
                .then(res => {
                    const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('expirationTime', expirationTime);
                    dispatch(authSuccess(token, userId));
                })
                .catch(err => {
                    if(typeof response.data.token !== "undefined") {
                        dispatch(authSuccess(token, userId));
                    } else {
                        dispatch(authFailed(SERVER_ERROR_MSG));
                    }
                });
            } else {
                dispatch(authFailed(SERVER_ERROR_MSG));
            }
        })
        .catch(error => {
            dispatch(authFailed(SERVER_ERROR_MSG));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
        const currentTIme = new Date().getTime();
        if(currentTIme >= expirationTime) {
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('questionsData');
            dispatch(setRedirectPath("/"));
        } else {
            const token = localStorage.getItem('token');
            if(token) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
            }
        }
    }
}

export const setRedirectPath = path => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        redirectPath: path
    }
};

export const redirectPath = (path) => {
    return dispatch => {
        dispatch(setRedirectPath(path));
    }
};

export const onLogOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('questionsData');
        dispatch(onLogOut());
    }
}

export const setNewUserAction = () => {
    return {
        type: actionTypes.NEW_USER
    }
}

export const setNewUser = () => {
    return dispatch => {
        dispatch(setNewUserAction());
    }
}

export const forgotPasswordLinkClickAction = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD
    }
}

export const forgotPasswordLinkClick = () => {
    return dispatch => {
        dispatch(forgotPasswordLinkClickAction())
    }
}

export const backToLoginClickAction = () => {
    return {
        type: actionTypes.BACK_TO_LOGIN
    }
}

export const backToLoginClick = () => {
    return dispatch => {
        dispatch(backToLoginClickAction());
    }
}

export const sendLinkAction = email => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT,
        email: email
    }
}

export const sendLink = email => {
    return dispatch => {
        axios.post(`${SERVER_ROOT_URL}/get/email-exists-check.php`, qs.stringify({email: email}))
        .then(res => {
            if(res.data.status === 'success') {
                if(res.data.msg === 'exists') {
                    axios.post(`${FIREBASE_ROOT_URL}getOobConfirmationCode?key=${API_KEY}`, {
                        requestType: 'PASSWORD_RESET',
                        email: email
                    })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    dispatch(sendLinkSuccessAction());
                } else if(res.data.msg === 'google') {
                    dispatch(sendLinkFailedAction('Entered email does not exists, either you are new or had used Google Login'));
                } else {
                    dispatch(sendLinkFailedAction('Entered email does not exists, If you are new, Please use Sign Up to create your account'));
                }
            }
        })
        .catch(err => {
            dispatch(sendLinkFailedAction(SERVER_ERROR_MSG));
        });
        dispatch(sendLinkAction(email));
    }
}

export const sendLinkFailedAction = error => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT_FAILED,
        error: error
    }
}

export const sendLinkSuccessAction = () => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT_SUCCESS
    }
}

export const changePasswordAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD
    }
}

export const changePassword = (password, medium, oobCode) => {
    return dispatch => {
        axios.post(`${FIREBASE_ROOT_URL}resetPassword?key=${API_KEY}`, {
            oobCode: oobCode,
            newPassword: password
        })
        .then(res => {
            console.log(res.data);
            
            // server call
            console.log(password, medium, oobCode);
            dispatch(changePasswordAction());
        })
        .catch(err => {
            dispatch(changedPasswordFailedAction('The Link is expired, Please use reset password again to get new link'));
        });
    }
}

export const changedPasswordSuccessAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS
    }
}

export const changedPasswordSuccess = () => {
    return dispatch => {
        dispatch(changedPasswordSuccessAction())
    }
}

export const changedPasswordFailedAction = error => {
    return {
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error: error
    }
}

export const changedPassswordResetStatesAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_RESET_STATES
    }
}

export const changedPassswordResetStates = () => {
    return dispatch => {
        dispatch(changedPassswordResetStatesAction())
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

