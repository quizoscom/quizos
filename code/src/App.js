import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateQuiz from './containers/CreateQuiz/CreateQuiz';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth'
import Error404 from './components/Error404/Error404';

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
            <Route path="/quiz" component={Quiz} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={Home} />
            <Route component={Error404} />
          </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
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
