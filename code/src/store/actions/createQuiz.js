import axios from 'axios';
import qs from 'qs';

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
        axios.post('http://localhost/evaluiz/set/set-quiz-data.php', qs.stringify(params))
         .then(res => {
             console.log(params);
            if(res.data['status'] === 'success') {
                dispatch(createQuizSuccess('http://localhost:3000/quiz/' + params.language + '/' + res.data['quiz_id'], res.data['quiz_id']));
            } else {
                dispatch(createQuizFailed(res.data['msg']));
                alert(res.data['msg']);
            }
        });
    };
};