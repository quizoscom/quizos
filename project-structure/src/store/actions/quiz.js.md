# quiz.js

### actions

| name | params | description |
| :--- | :--- | :--- |
| quizContinue | answer, questionId, quizContinueFlag | call QUIZ\_CONTINUE |
| quizCompleteSuccess | score | call QUIZ\_COMPLETE\_SUCCESS |
| quizCompleteFailed | error | call QUIZ\_COMPLETE\_FAILED |
| quizQuit |  | call QUIZ\_QUIT |
| quizCont | answer, questionId, quizContinueFlag | dispatch quizContinue |
| quizComp |  | call QUIZ\_COMPLETE |
| quizComplete | answers, timerValue, quizId, userId | dispatch quizComp and update quiz answers in the database and dispatch quizCompleteSuccess |
| quizQuitHandler |  | dispatch quizQuit |
| seeScore | answers, timerValue, quizId, userId | dispatch quizComplete |
| counterComplete |  | call COUNTER\_COMPLETE |
| counterCompleted |  | dispatch counterComplete |
| noOfQuestionsSet | noOfQuestions, quizId | call SET\_NO\_QF\_QUESTIONS |
| setNoOfQuestions | noOfQuestions, quizId | dispatch noOfQuestionsSet |
| resetRedirectPath |  | call RESET\_ALL\_QUIZ\_STATES |
| resetRedirectPathFromScore |  | dispatch resetRedirectPath |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/quiz.js" %}
```javascript
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

export const quizCompleteSuccess = score => {
    return {
        type: actionTypes.QUIZ_COMPLETE_SUCCESS,
        score: score
    };
};

export const quizCompleteFailed = error => {
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
```
{% endcode-tabs-item %}
{% endcode-tabs %}

