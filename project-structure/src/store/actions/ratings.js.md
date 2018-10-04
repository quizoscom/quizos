# ratings.js

### actions

| name | params | description |
| :--- | :--- | :--- |
| saveRatingAndReviewAction |  | call SAVE\_RATINGS\_AND\_REVIEW |
| saveRatingAndReview | rating, review, usersId, quizId | dispatch saveRatingAndReviewAction, update reviews for the quiz in the database and on success dispatch saveRatingAndReviewSuccessAction |
| saveRatingAndReviewSuccessAction |  | call SAVE\_RATINGS\_AND\_REVIEW\_SUCCESS |
| saveRatingAndReviewSuccessFailedAction | error | call SAVE\_RATINGS\_AND\_REVIEW\_FAILED |
| resetRatingsAndReviewStatesAction |  | call RESET\_RATINGS\_AND\_REVIEW\_STATES |
| resetRatingsAndReviewStates |  | dispatch resetRatingsAndReviewStatesAction |



### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/ratings.js" %}
```javascript
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
```
{% endcode-tabs-item %}
{% endcode-tabs %}

