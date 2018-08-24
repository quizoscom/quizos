import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import classes from './Home.css';
import questionMark from '../../assets/question-mark-icon.png';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Features from '../../components/Features/Features';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/';

class Home extends Component {
    componentDidMount() {
        this.props.onSetRedirectPath("/");
    }

    onClickTakeQuizHandler = () => {
        if(this.props.isAuth) {
            this.props.history.push("/available-quizzes");
        } else {
            this.props.onSetRedirectPath("/available-quizzes");
            this.props.history.push("/auth");
        }
    }

    onClickCreateQuizHandler = () => {
        if(this.props.isAuth) {
            this.props.history.push("/create-quiz");
        } else {
            this.props.onSetRedirectPath("/create-quiz");
            this.props.history.push("/auth");
        }
    }

    render() {
        return (
            <Aux>
                <div className={classes.Home}>
                    <img src={questionMark} alt=""/>
                    <p>Easiest Way to Create or Take A Quiz</p>
                    <p className={classes.Subtitle}>(It's <span data-tip="No Terms and Conditions Applied">FREE</span> to use forever)</p>
                    <ReactTooltip 
                        type="dark"
                        effect="solid"
                        place="top"
                        className={classes.ToolTip}
                    />
                    <div className={classes.ButtonGroup}>
                        <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                        <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                    </div>
                </div>
                <hr />
                <Features />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetRedirectPath: (path) => dispatch(actions.redirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);