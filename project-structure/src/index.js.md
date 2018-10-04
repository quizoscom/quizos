# index.js

{% code-tabs %}
{% code-tabs-item title="/src/index.js" %}
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import quizReducer from './store/reducers/quiz';
import createQuizReducer from './store/reducers/createQuiz';
import timerReducer from './store/reducers/timer';
import alertReducer from './store/reducers/alert';
import confirmReducer from './store/reducers/confirm';
import ratingReducer from './store/reducers/ratings';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    timer: timerReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    rating: ratingReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

```
{% endcode-tabs-item %}
{% endcode-tabs %}

