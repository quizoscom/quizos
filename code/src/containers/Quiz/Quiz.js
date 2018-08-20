import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import classes from './Quiz.css';
import PreQuizIcon from '../../assets/pre-quiz-header-icon.png';
import CounterCompleteIcon from '../../assets/times-up-icon.png';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';

import Timer from '../../components/Timer/Timer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import * as actions from '../../store/actions';

class Quiz extends Component {
    state = {
        quizId: '',
        language: '',
        timer: '',
        noOfQuestions: 0,
        questions: [],
        currentSelectedAnswer: '',
        currentSelectedQuestionId: '',
        preQuizInfo: [
            { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." }
        ],
        alert: '',
        alertType: ''
    }

    componentDidMount() {
        const quizId = this.props.match.params.quizId;
        const language = this.props.match.params.language;
        this.setState(prevState => ({
            language: language
        }));
        axios.post('http://localhost/evaluiz/get/get-quiz-data.php', qs.stringify({quizId: quizId}))
        .then(res => {
            this.setState(prevState => ({
                timer: parseFloat(res.data.test_time),
                questions: res.data.questions
            }));
            this.props.setNoOfQuestions(parseInt(res.data.total_questions, 10), quizId);
        })
        .catch(err => {
            this.props.onShowAlert('Server Error, Please Try after some time', 'failed');
        });
    }

    componentDidUpdate() {
        if(this.props.okClicked) {
            this.props.onQuizQuit();
        }
    }

    componentWillUnmount() {
        this.props.onOkClicked(0);
        this.props.onResetRedirectPathFromScore();
    }

    onButtonContinueClickedHandler = () => {
        if(this.state.currentSelectedAnswer !== '' || this.props.quizActive === 0) {
            if(this.props.currentQuestionsNumber+1 === this.props.noOfQuestions) {
                this.props.onQuizContinue(this.state.currentSelectedAnswer, this.state.currentSelectedQuestionId, 1);
                setTimeout(() => {
                    // calculate time spent on quiz
                    const totalTimeInSecs = this.state.timer * 60;
                    const timeLeftInSecs = (this.props.hr * 3600) + (this.props.mins * 60) + (this.props.secs);
                    this.props.onQuizComplete(this.props.answers, (totalTimeInSecs - timeLeftInSecs), this.props.quizId, this.props.userId);
                }, 1500);
            } else {
                this.props.onQuizContinue(this.state.currentSelectedAnswer, this.state.currentSelectedQuestionId, 1);
            }
            this.setState(prevState => ({
                currentSelectedAnswer: '',
            }));
            this.props.onHideAlert();
        } else {
            this.props.onShowAlert('Please select one of the answer before proceeding', 'warning');
        }
    }

    onAnswerSelectedHandler = (selected) => {
        this.setState(prevState => ({
            currentSelectedAnswer: selected,
            currentSelectedQuestionId: prevState.questions[this.props.currentQuestionsNumber].question_id
        }));
        this.props.onQuizContinue(selected, this.state.questions[this.props.currentQuestionsNumber].question_id, 0);
    }

    onQuitButtonClickHandler = () => {
        this.props.onShowConfirm('Please Confirm to Quit the Quiz');
    }

    onSeeScoreButtonClick = () => {
        this.props.onSeeScore(this.props.answers, this.props.quizId, this.props.userId);
    }

    onCompleteCounterHandler = (event) => {
        this.props.onCounterComplete();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.error !== null && nextProps.error !== '') {
            nextProps.onShowAlert(nextProps.error, 'failed');
        } else {
            nextProps.onHideAlert();
        }
        return true;
    }

    render() {
        let body = <Loader />;
        if(!this.props.loading) {
            if(this.props.redirectTo !== "") {
                body = <Redirect to={this.props.redirectTo} />
            } else if(this.props.quizActive === 0 && this.props.counterComplete === 0) {
                body = (
                    <Aux>
                        <p className={classes.Language}>{this.state.language} Quiz</p>
                        <div className={classes.PreQuizInformations}>
                            <div className={classes.Icon}>
                                <img src={PreQuizIcon} alt="Note" />
                            </div>
                            <div className={classes.Info}>
                                <p className={classes.Title}>READ CAREFULLY BEFORE PROCEEDING</p>
                                <ol>
                                    {this.state.preQuizInfo.map(info => {
                                        return <li key={info.id}>{info.text}</li>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className={classes.ButtonGroup}>
                            <Button btnType="nimp" clicked={this.onQuitButtonClickHandler} >Cancel</Button>
                            <Button btnType="cta" clicked={this.onButtonContinueClickedHandler} >Continue</Button>
                        </div>
                    </Aux>
                );
            } else if(this.props.counterComplete) {
                body = (
                    <div className={classes.CounterComplete}>
                        <img src={CounterCompleteIcon} alt="Counter Complete Icon"/>
                        <Button btnType="cta" className="SeeScoreButton" clicked={this.onSeeScoreButtonClick} >See Your Score</Button>
                    </div>
                );
            } else {
                body = <Loader />;
            }
        }

        if(this.state.questions.length !== 0 && this.props.redirectTo !== "/" && this.props.quizActive !== 0 && this.props.counterComplete === 0 && this.props.currentQuestionsNumber < this.props.noOfQuestions && !this.props.loading) {
            body = (
                <Aux>
                    <p className={classes.Language}>{this.state.language} Quiz</p>
                    <div>
                        <div style={{
                            height: '3em',
                            padding: '0 2em',
                            fontSize: '2rem'
                        }}>
                            <p className={classes.questionSNo}>Q. <span>{this.props.currentQuestionsNumber+1}</span>/<span>{this.props.noOfQuestions}</span></p>
                            <div className={classes.counterCont}>
                                <Timer timer={this.state.timer} />
                            </div>
                        </div>
                        <div style={{
                                margin: '3em auto',
                                width: '67%',
                                fontSize: '1.4rem'
                        }}>
                            <Question viewer title={this.state.questions[this.props.currentQuestionsNumber].question} className="questionViewer" />
                            <Choices viewer choices={this.state.questions[this.props.currentQuestionsNumber].choices} className="choicesViewer" clicked={this.onAnswerSelectedHandler} selected={this.state.currentSelectedAnswer} />
                        </div>
                    </div>
                    <div className={classes.ButtonGroup}>
                        <Button btnType="nimp" clicked={this.onQuitButtonClickHandler} >Quit</Button>
                        <Button btnType="cta" clicked={this.onButtonContinueClickedHandler} >Continue</Button>
                    </div>
                </Aux>
            );
        }

        return (
            <div className={classes.Quiz}>
                {body}
                {
                    this.props.alertMsg !== ''
                    ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                    : null
                }
                {
                    this.props.confirmMsg !== ''
                    ? <Confirm>{this.props.confirmMsg}</Confirm>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizId: state.quiz.quizId,
        currentQuestionsNumber: state.quiz.currentQuestionsNumber,
        answers: state.quiz.answers,
        loading: state.quiz.loading,
        error: state.quiz.error,
        score: state.quiz.score,
        redirectTo: state.quiz.redirectTo,
        quizActive: state.quiz.quizActive,
        counterComplete: state.quiz.counterComplete,
        noOfQuestions: state.quiz.noOfQuestions,
        userId: state.auth.userId,
        hr: state.timer.hr,
        mins: state.timer.mins,
        secs: state.timer.secs,
        alertMsg: state.alert.alertMsg,
        alertType: state.alert.alertType,
        confirmMsg: state.confirm.confirmMsg,
        okClicked: state.confirm.okClicked
    }
}

const mapDisptachToPros = dispatch => {
    return {
        onQuizComplete: (answers, timerValue, quizId, userId) => dispatch(actions.quizComplete(answers, timerValue, quizId, userId)),
        onQuizContinue: (answer, questionId, quizContinueFlag) => dispatch(actions.quizCont(answer, questionId, quizContinueFlag)),
        onQuizQuit: () => dispatch(actions.quizQuitHandler()),
        onResetRedirectPathFromScore: () => dispatch(actions.resetRedirectPathFromScore()),
        onSeeScore: (answers, quizId, userId) => dispatch(actions.seeScore(answers, 0, quizId, userId)),
        onCounterComplete: () => dispatch(actions.counterCompleted()),
        setNoOfQuestions: (noOfQuestions, quizId) => dispatch(actions.setNoOfQuestions(noOfQuestions, quizId)),
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
        onHideAlert: () => dispatch(actions.hideAlert()),
        onShowConfirm: (confirmMsg) => dispatch(actions.showConfirm(confirmMsg)),
        onHideConfirm: () => dispatch(actions.hideConfirm()),
        onOkClicked: (okClicked) => dispatch(actions.okClicked(okClicked))
    }
}

export default connect(mapStateToProps, mapDisptachToPros)(Quiz);