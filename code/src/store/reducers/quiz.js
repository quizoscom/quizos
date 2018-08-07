import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    quizId: '',
    answers: [],
    currentQuestionsNumber: -1,
    loading: false,
    error: null,
    score: '',
    quizActive: 0,
    redirectTo: "",
    counterComplete: 0,
    noOfQuestions: 0,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.QUIZ_QUIT:
            return updateObject(state, {
                answers: [],
                currentQuestionsNumber: 0,
                loading: false,
                error: null,
                score: 0,
                quizActive: 0,
                redirectTo: "/"
            });
        case actionTypes.QUIZ_CONTINUE:
            let newAnswers = state.answers.slice();
            if(state.currentQuestionsNumber >= 0 ) {
                if(typeof newAnswers[state.currentQuestionsNumber] === "undefined") {
                    newAnswers[state.currentQuestionsNumber] = {questionId: '', answer: ''};
                }
                newAnswers[state.currentQuestionsNumber]['answer'] = action.answer;
                newAnswers[state.currentQuestionsNumber]['questionId'] = action.questionId;
            }
            let newCurrentQuestionsNumber = null;
            if(action.quizContinueFlag === 1) {
                newCurrentQuestionsNumber = state.currentQuestionsNumber + 1;
            } else {
                newCurrentQuestionsNumber = state.currentQuestionsNumber;
            }
            return updateObject(state, { answers: newAnswers, currentQuestionsNumber: newCurrentQuestionsNumber, quizActive: 1 });
        case actionTypes.QUIZ_COMPLETE_SUCCESS:
            return updateObject(state, { loading: false, error: null, quizActive: 0, score: action.score, redirectTo: "/score"});
        case actionTypes.QUIZ_COMPLETE_FAILED:
            return updateObject(state, { loading: false, error: action.error, quizActive: 0 });
        case actionTypes.QUIZ_COMPLETE:
            return updateObject(state, { loading: true });
        case actionTypes.COUNTER_COMPLETE:
            return updateObject(state, { counterComplete: 1 });
        case actionTypes.SET_NO_QF_QUESTIONS:
            return updateObject(state, { noOfQuestions: action.noOfQuestions, quizId: action.quizId});
        case actionTypes.RESET_ALL_QUIZ_STATES:
            return updateObject(state, {
                answers: [],
                currentQuestionsNumber: -1,
                loading: false,
                error: null,
                quizActive: 0,
                redirectTo: "",
                counterComplete: 0,
            });
        default:
            return state;
    }
}

export default reducer;