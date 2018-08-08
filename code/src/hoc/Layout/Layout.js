import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        sidebarOpen: true
    }

    showSettings = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div id="outer-container">
                <Toolbar isAuth={this.props.isAuth} isQuizActive={this.props.isQuizActive} />
                { !this.props.isQuizActive ? <Sidebar isAuth={this.props.isAuth} /> : null }
                
                <main className={classes.Content} id="page-wrap">
                    {this.props.children}
                </main>
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

export default connect(mapStateToProps)(Layout);