import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../actions/actionTypes';
import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';

export const saveRatingAndReviewAction = () => {
    return {
        type: actionTypes.SAVE_RATINGS_AND_REVIEW        
    }
}

export const saveRatingAndReview = (rating, review, usersId, quizId) => {
    return dispatch => {
        dispatch(saveRatingAndReviewAction())
        
        axios.post(`${SERVER_ROOT_URL}/set/set-reviews.php`, qs.stringify({
            rating: rating,
            review: review,
            usersId: usersId,
            quizId: quizId
        }))
        .then(res => {
            if(res.data.status === 'success') {
                dispatch(saveRatingAndReviewSuccessAction())
            } else {
                dispatch(saveRatingAndReviewSuccessFailedAction(SERVER_ERROR_MSG));
            }
        });
    }
}

export const saveRatingAndReviewSuccessAction = () => {
    return {
        type: actionTypes.SAVE_RATINGS_AND_REVIEW_SUCCESS
    }
}

export const saveRatingAndReviewSuccessFailedAction = error => {
    return {
        type: actionTypes.SAVE_RATINGS_AND_REVIEW_FAILED,
        error: error
    }
}

export const resetRatingsAndReviewStatesAction = () => {
    return {
        type: actionTypes.RESET_RATINGS_AND_REVIEW_STATES
    }
}

export const resetRatingsAndReviewStates = () => {
    return dispatch => {
        dispatch(resetRatingsAndReviewStatesAction());
    }
}