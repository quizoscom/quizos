import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import ReactCountdownClock from 'react-countdown-clock'; //https://github.com/pughpugh/react-countdown-clock

import classes from './Quiz.css';
import PreQuizIcon from '../../assets/pre-quiz-header-icon.png';
import CounterCompleteIcon from '../../assets/times-up-icon.png';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import * as actions from '../../store/actions';

class Quiz extends Component {
    state = {
        language: '',
        timer: '',
        noOfQuestions: 0,
        questions: [],
        currentSelectedAnswer: '',
        preQuizInfo: [
            { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." },
            { id: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero ipsum, maximus at venenatis ac, iaculis tincidunt odio." }
        ]
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
                timer: parseFloat(res.data.test_time) * 60,
                noOfQuestions: parseInt(res.data.total_questions, 10),
                questions: res.data.questions
            }));
        });
    }

    onButtonContinueClickedHandler = () => {
        if(this.props.currentQuestionsNumber+1 === this.state.noOfQuestions) {
            this.props.onQuizComplete(this.props.answers, 0);
        } else {
            this.props.onQuizContinue(this.currentSelectedAnswer);
        }
    }

    onAnswerSelectedHandler = (selected) => {
        this.setState(prevState => ({
            currentSelectedAnswer: selected
        }));
    }

    onQuitButtonClickHandler = () => {
        // show confirm alert
        this.props.onQuizQuit();
    }

    onSeeScoreButtonClick = () => {
        this.props.onSeeScore(this.props.answers);
    }

    onCompleteCounterHandler = () => {
        this.props.onCounterComplete();
    }

    render() {
        let body = null;
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
            body = <p>Loading</p>;
        }

        if(this.state.questions.length !== 0 && this.props.redirectTo !== "/" && this.props.quizActive !== 0 && this.props.counterComplete === 0) {
            body = (
                <Aux>
                    <p className={classes.Language}>{this.state.language} Quiz</p>
                    <div>
                        <div style={{
                            height: '3em',
                            padding: '0 2em',
                            fontSize: '2rem'
                        }}>
                            <p className={classes.questionSNo}>Q. <span>{this.props.currentQuestionsNumber+1}</span>/<span>{this.state.noOfQuestions}</span></p>
                            <div className={classes.counterCont}>
                                <ReactCountdownClock
                                    seconds={this.state.timer}
                                    color='#124f5f'
                                    alpha={0.9}
                                    size={100}
                                    onComplete={this.onCompleteCounterHandler}
                                />
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentQuestionsNumber: state.quiz.currentQuestionsNumber,
        answers: state.quiz.answers,
        loading: state.quiz.loading,
        error: state.quiz.error,
        score: state.quiz.score,
        redirectTo: state.quiz.redirectTo,
        quizActive: state.quiz.quizActive,
        counterComplete: state.quiz.counterComplete
    }
}

const mapDisptachToPros = dispatch => {
    return {
        onQuizComplete: (answers, timerValue) => dispatch(actions.quizComp(answers, timerValue)),
        onQuizContinue: (answer) => dispatch(actions.quizCont(answer)),
        onQuizQuit: () => dispatch(actions.quizQuitHandler()),
        onSeeScore: (answers) => dispatch(actions.seeScore(answers, 0)),
        onCounterComplete: () => dispatch(actions.counterCompleted())
    }
}

export default connect(mapStateToProps, mapDisptachToPros)(Quiz);