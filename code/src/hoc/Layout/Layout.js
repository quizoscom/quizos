import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} isQuizActive={this.props.isQuizActive} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
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

export default connect(mapStateToProps)(Layout);