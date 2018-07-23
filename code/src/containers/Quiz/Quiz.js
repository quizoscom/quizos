import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import ReactCountdownClock from 'react-countdown-clock'; //https://github.com/pughpugh/react-countdown-clock

import classes from './Quiz.css';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Quiz extends Component {
    state = {
        language: '',
        timer: '13:12',
        noOfQuestions: 0,
        questions: [],
        currentQuestionNo: 1,
        selectedAnswers: [],
        currentSelectedAnswer: ''
    }

    componentDidMount() {
        const quizId = this.props.match.params.quizId;
        const language = this.props.match.params.language;
        this.setState(prevState => ({
            language: language
        }));
        axios.post('http://localhost/evaluiz/get/get-quiz-data.php', qs.stringify({quizId: quizId}))
        .then(res => {
            console.log(parseInt(res.data.total_questions, 10));
            this.setState(prevState => ({
                timer: parseFloat(res.data.test_time) * 60,
                noOfQuestions: parseInt(res.data.total_questions, 10),
                questions: res.data.questions
            }));
            console.log(res.data);
        });
    }

    onButtonContinueClickedHandler = () => {
        if(this.state.currentQuestionNo === this.state.noOfQuestions) {
            console.log('submit quiz');
        } else {
            this.setState(prevState => ({
                currentQuestionNo: prevState.currentQuestionNo + 1
            }));
        }
    }

    onAnswerSelectedHandler = (selected) => {
        let newSelectedAnswers = [];
        if(this.state.selectedAnswers.length !== 0) {
            newSelectedAnswers = this.state.selectedAnswers.slice();
        }
        newSelectedAnswers[this.state.currentQuestionNo-1] = selected;
        this.setState(prevState => ({
            selectedAnswers: newSelectedAnswers
        }));
        this.setState(prevState => ({
            currentSelectedAnswer: selected
        }));
    }

    onCompleteCounterHandler = () => {
        console.log('counter complete');
    }

    render() {
        let body = <p>Loading</p>
        if(this.state.questions.length !== 0) {
            body = (
                <Aux>
                    <p className={classes.Language}>{this.state.language} Quiz</p>
                    <div>
                        <div style={{
                            height: '3em',
                            padding: '0 2em',
                            fontSize: '2rem'
                        }}>
                            <p className={classes.questionSNo}>Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p>
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
                            <Question viewer title={this.state.questions[this.state.currentQuestionNo].question} className="questionViewer" />
                            <Choices viewer choices={this.state.questions[this.state.currentQuestionNo].choices} className="choicesViewer" clicked={this.onAnswerSelectedHandler} selected={this.state.currentSelectedAnswer} />
                        </div>
                    </div>
                    <div className={classes.ButtonGroup}>
                        <Button btnType="nimp" clicked={this.quitButtonClickHandler} >Quit</Button>
                        <Button btnType="cta" clicked={this.continueButtonClickHandler} >Continue</Button>
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

export default Quiz;