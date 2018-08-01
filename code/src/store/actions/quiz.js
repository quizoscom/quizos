// import axios from 'axios';
// import qs from 'qs';

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

export const quizComplete = () => {
    return {
        type: actionTypes.QUIZ_COMPLETE
    };
};

export const quizQuit = () => {
    return {
        type: actionTypes.QUIZ_QUIT
    };
};

export const quizCont = (answer, questionId) => {
    return dispatch => {
        // console.log('quiz continue')
        dispatch(quizContinue(answer, questionId));
    };
};

export const quizComp = (answers, timerValue) => {
    return dispatch => {
        console.log('quiz complete');
        console.log(answers);
        dispatch(quizComplete(answers));

        // server call to save answers and timerValue and calculate score
        let score = 20;
        dispatch(quizCompleteSuccess(score));
    };
};

export const quizQuitHandler = () => {
    return dispatch => {
        console.log('quit quiz');
        dispatch(quizQuit());
    };
};

export const seeScore = (answers, timerValue) => {
    return dispatch => {
        dispatch(quizComp(answers, timerValue));
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