import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';
import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';

export const quizContinue = (answer, questionId, quizContinueFlag) => {
    return {
        type: actionTypes.QUIZ_CONTINUE,
        answer: answer,
        questionId: questionId,
        quizContinueFlag: quizContinueFlag
    };
};

export const quizCompleteSuccess = (score) => {
    return {
        type: actionTypes.QUIZ_COMPLETE_SUCCESS,
        score: score
    };
};

export const quizCompleteFailed = (error) => {
    return {
        type: actionTypes.QUIZ_COMPLETE_FAILED,
        error: error
    };
};

export const quizQuit = () => {
    return {
        type: actionTypes.QUIZ_QUIT
    };
};

export const quizCont = (answer, questionId, quizContinueFlag) => {
    return dispatch => {
        dispatch(quizContinue(answer, questionId, quizContinueFlag));
    };
};

export const quizComp = () => {
    return {
        type: actionTypes.QUIZ_COMPLETE
    }
}

export const quizComplete = (answers, timerValue, quizId, userId) => {
    return dispatch => {
        dispatch(quizComp());
        axios.post(`${SERVER_ROOT_URL}/set/set-quiz-answers.php`, qs.stringify({
            answers: answers,
            quizId: quizId,
            timerValue: timerValue,
            userId: userId
        }))
        .then(res => {
            if(res.data.status === 'success') {
                dispatch(quizCompleteSuccess(res.data.score));
            } else {
                dispatch(quizCompleteFailed(SERVER_ERROR_MSG));
            }
        })
        .catch(err => {
            dispatch(quizCompleteFailed(SERVER_ERROR_MSG));
        });
    };
};

export const quizQuitHandler = () => {
    return dispatch => {
        dispatch(quizQuit());
    };
};

export const seeScore = (answers, timerValue, quizId, userId) => {
    return dispatch => {
        dispatch(quizComplete(answers, timerValue, quizId, userId));
    }
}

export const counterComplete = () => {
    return {
        type: actionTypes.COUNTER_COMPLETE
    }
}

export const counterCompleted = () => {
    return dispatch => {
        dispatch(counterComplete());
    }
}

export const noOfQuestionsSet = (noOfQuestions, quizId) => {
    return {
        type: actionTypes.SET_NO_QF_QUESTIONS,
        noOfQuestions: noOfQuestions,
        quizId: quizId
    }
}

export const setNoOfQuestions = (noOfQuestions, quizId) => {
    return dispatch => {
        dispatch(noOfQuestionsSet(noOfQuestions, quizId));
    }
}

export const resetRedirectPath = () => {
    return {
        type: actionTypes.RESET_ALL_QUIZ_STATES
    }
}

export const resetRedirectPathFromScore = () => {
    return dispatch => {
        dispatch(resetRedirectPath());
    }
}