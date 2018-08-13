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

import EmailTemplate from './containers/EmailTemplate/EmailTemplate';

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
          <Route path="/reset-password/:uid" component={ResetPassword} />
          <Route path="/email" component={EmailTemplate} />
          <Route path="/" exact component={Home} />
          <Route component={Error404} />
        </Switch>
      );
    }
    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
