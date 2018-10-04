---
description: define routes under the layout component
---

# App.js

### store props

| name | link |
| :--- | :--- |
| isAuth, token | link to auth reducer |
| isQuizActive | link to quiz reducer |



### store actions

| name | link |
| :--- | :--- |
| onTryAutoLogin | link to auth actions |



### code

{% code-tabs %}
{% code-tabs-item title="/src/App.js" %}
```javascript
import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';

import Layout from './hoc/Layout/Layout';

import Error404 from './components/Error404/Error404';
import LogOut from './components/LogOut/LogOut';

import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateQuiz from './containers/CreateQuiz/CreateQuiz';
import QuizLists from './containers/QuizLists/QuizLists';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth'
import Score from './containers/Score/Score';
import ResetPassword from './containers/ResetPassword/ResetPassword';

import * as actions from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = null;
    if(this.props.isAuth) {
      routes = (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-quiz" exact component={CreateQuiz} />
            <Route path="/available-quizzes" component={QuizLists} />
            <Route path="/quiz/:language/:quizId" component={Quiz} />
            <Route path="/score" component={Score}/>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={LogOut}/>
            <Route path="/" exact component={Home} />
            <Route component={Error404} />
          </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/" exact component={Home} />
          <Route component={Error404} />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout
          isAuth={this.props.isAuth}
          isQuizActive={this.props.isQuizActive}
        >
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuth: state.auth.token !== null,
    isQuizActive: state.quiz.quizActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

```
{% endcode-tabs-item %}
{% endcode-tabs %}

