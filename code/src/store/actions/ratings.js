import axios from 'axios';
import qs from 'qs';

import * as actionTypes from '../actions/actionTypes';

export const saveRatingAndReviewAction = () => {
    return {
        type: actionTypes.SAVE_RATINGS_AND_REVIEW        
    }
}

export const saveRatingAndReview = (rating, review, usersId, quizId) => {
    return dispatch => {
        dispatch(saveRatingAndReviewAction())
        
        axios.post('http://localhost/evaluiz/set/set-reviews.php', qs.stringify({
            rating: rating,
            review: review,
            usersId: usersId,
            quizId: quizId
        }))
        .then(res => {
            if(res.data.status === 'success') {
                dispatch(saveRatingAndReviewSuccessAction())
            } else {
                dispatch(saveRatingAndReviewSuccessFailedAction("Server Error, Please try after some time."));
            }
        });
    }
}

export const saveRatingAndReviewSuccessAction = () => {
    return {
        type: actionTypes.SAVE_RATINGS_AND_REVIEW_SUCCESS
    }
}

export const saveRatingAndReviewSuccessFailedAction = (error) => {
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