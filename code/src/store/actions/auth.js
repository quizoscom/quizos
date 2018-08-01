import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';

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

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password, register) => {
    return dispatch => {
        console.log('actions auth');
        dispatch(authStart());
        const API_KEY="AIzaSyB04gE4c2KLcZsOwDM8JhAQx1AJQ37OwWo";
        const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
        if(register) {
            // register a user with email and password using firebase authentication
            axios.post(`${BASE_URL}signupNewUser?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                const params = {
                    email: email,
                    token: res.data.idToken,
                    userId: res.data.localId
                }

                axios.post('http://localhost/evaluiz/auth.php', qs.stringify(params))
                .then(response => {
                    this.setState(prevState => ({
                        errorMessage: ""
                    }));
                    if(response.data.status === 'success') {
                        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                        localStorage.setItem('token', res.data.idToken);
                        localStorage.setItem('userId', res.data.localId);
                        localStorage.setItem('expirationTime', expirationTime);
                        dispatch(authSuccess(res.data.idToken, res.data.localId));
                    } else {
                        dispatch(authFailed(response.data.msg));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error.message.replace(/_/ig, ' ')));
            });
        } else {
            // login a user with email and password using firebase authentication
            axios.post(`${BASE_URL}verifyPassword?key=${API_KEY}`, {
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

export const authCheckState = () => {
    return dispatch => {
        const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
        const currentTIme = new Date().getTime();
        console.log(expirationTime);
        console.log(currentTIme);
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

export const setRedirectPath = (path) => {
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