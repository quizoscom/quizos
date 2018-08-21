import axios from 'axios';
import qs from 'qs';

import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';
import { capitalizeFirstLetter } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const createQuiz = () => {
    return {
        type: actionTypes.CREATE_QUIZ
    };
};

export const createQuizSuccess = (shareLink, quizId) => {
    return {
        type: actionTypes.CREATE_QUIZ_SUCCESS,
        shareLink: shareLink,
        quizId: quizId
    }
}

export const createQuizFailed = (error) => {
    return {
        type: actionTypes.CREATE_QUIZ_FAILED,
        error: error
    }
}

export const creatingQuiz = (params) => {
    return dispatch => {
        dispatch(createQuiz());
        axios.post(`${SERVER_ROOT_URL}/set/set-quiz-data.php`, qs.stringify(params))
         .then(res => {
            if(res.data['status'] === 'success') {
                dispatch(createQuizSuccess('http://localhost:3000/quiz/' + params.language + '/' + res.data['quiz_id'], res.data['quiz_id']));
            } else {
                dispatch(createQuizFailed(res.data['msg']));
            }
        }).catch(err => {
            dispatch(createQuizFailed(SERVER_ERROR_MSG));
        });
    };
};

export const loadLanguagesAction = () => {
    return {
        type: actionTypes.LOAD_LANGUAGES
    }
}

export const loadLanguagesSuccessAction = (languagesOptions) => {
    return {
        type: actionTypes.LOAD_LANGUAGES_SUCCESS,
        languagesOptions: languagesOptions
    }
}

export const loadLanguagesFailedAction = (error) => {
    return {
        type: actionTypes.LOAD_LANGUAGES_FAILED,
        error: error
    }
}

export const loadLanguages = () => {
    return dispatch => {
        dispatch(loadLanguagesAction())
        axios.get(`${SERVER_ROOT_URL}/get/get-languages-list.php`)
        .then(res => {
            if(res.data.length !== 0) {
                let newLanguagesOptions = [];
                for(let i = 0; i < res.data.length; i++) {
                    newLanguagesOptions = newLanguagesOptions.concat({
                        value: res.data[i],
                        label: capitalizeFirstLetter(res.data[i])
                    });
                }
                dispatch(loadLanguagesSuccessAction(newLanguagesOptions))
            } else {
                dispatch(loadLanguagesFailedAction(SERVER_ERROR_MSG));
            }
        })
        .catch(err => {
            dispatch(loadLanguagesFailedAction(SERVER_ERROR_MSG));
        });
    }
}

export const resetQuestionsRelatedStateAction = (resetVal) => {
    return {
        type: actionTypes.RESET_QUESTIONS_RELATED_STATE,
        resetVal: resetVal
    }
}

export const resetQuestionsRelatedState = (resetVal) => {
    return dispatch => {
        dispatch(resetQuestionsRelatedStateAction(resetVal));
    }
}
