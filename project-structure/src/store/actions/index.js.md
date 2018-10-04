---
description: exporting all the actions from a common file
---

# index.js

### code

{% code-tabs %}
{% code-tabs-item title="/src/store/actions/index.js" %}
```javascript
export {
    auth,
    setNewUser,
    authFailedAction,
    authCheckState,
    redirectPath,
    googleLogin,
    logOut,
    forgotPasswordLinkClick,
    backToLoginClick,
    sendLink,
    changePassword,
    changedPassswordResetStates
} from './auth';

export {
    quizComplete,
    quizCont,
    quizComp,
    quizQuitHandler,
    seeScore,
    counterCompleted,
    setNoOfQuestions,
    resetRedirectPathFromScore
} from './quiz';

export { 
    creatingQuiz,
    loadLanguages,
    resetQuestionsRelatedState
} from './createQuiz'

export {
    timerRunning,
    timerStopped
} from './timer'

export {
    showAlert,
    hideAlert
} from './alert'

export {
    showConfirm,
    hideConfirm,
    okClicked
} from './confirm'

export {
    saveRatingAndReview,
    resetRatingsAndReviewStates
} from './ratings'
```
{% endcode-tabs-item %}
{% endcode-tabs %}

