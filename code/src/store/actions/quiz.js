import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';

export const quizContinue = (answer, questionId) => {
    return {
        type: actionTypes.QUIZ_CONTINUE,
        answer: answer,
        questionId: questionId
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

export const quizCont = (answer, questionId) => {
    return dispatch => {
        dispatch(quizContinue(answer, questionId));
    };
};

export const quizComp = () => {
    return {
        type: actionTypes.QUIZ_COMPLETE
    }
}

export const quizComplete = (answers, timerValue, quizId, userId) => {
    return dispatch => {
        console.log(timerValue);
        dispatch(quizComp());
        axios.post('http://localhost/evaluiz/set/set-quiz-answers.php', qs.stringify({
            answers: answers,
            quizId: quizId,
            timerValue: timerValue,
            userId: userId
        }))
        .then(res => {
            if(res.data.status === 'success') {
                dispatch(quizCompleteSuccess(res.data.score));
            } else {
                alert('server error');
            }
        })
        .catch(err => {
            
        });
    };
};

export const quizQuitHandler = () => {
    return dispatch => {
        console.log('quit quiz');
        dispatch(quizQuit());
    };
};

export const seeScore = (answers, timerValue, quizId) => {
    return dispatch => {
        dispatch(quizComplete(answers, timerValue, quizId));
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

export const noOfQuestionsSet = (noOfQuestions) => {
    return {
        type: actionTypes.SET_NO_QF_QUESTIONS,
        noOfQuestions: noOfQuestions
    }
}

export const setNoOfQuestions = (noOfQuestions) => {
    return dispatch => {
        dispatch(noOfQuestionsSet(noOfQuestions));
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