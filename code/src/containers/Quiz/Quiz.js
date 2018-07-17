import React, { Component } from 'react';

import classes from './Quiz.css';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import Button from '../../components/UI/Button/Button';

class Quiz extends Component {
    state = {
        langauge: 'React',
        timer: '13:12',
        noOfQuestions: 2,
        questions: [
            {question: 'In React, What method is used to update the state?', choices: ['updateState()', 'changeState()', 'setState()', 'stateChange()'], answer: 3},
            {question: 'What function allows you to render React content in an HTML page?', choices: ['ReactDOM.start()', 'React.render()', 'ReactDOM.render()', 'React.mount()'], answer: 3}
        ],
        currentQuestionNo: 1,
        selectedAnswers: [],
        currentSelectedAnswer: ''
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

    render() {
        return (
            <div className={classes.Quiz}>
                <p className={classes.Language}>{this.state.langauge} Quiz</p>
                <div>
                    <div style={{
                        height: '3em',
                        padding: '0 2em',
                        fontSize: '2rem'
                    }}>
                        <p className={classes.questionSNo}>Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p>
                        <p style={{
                                fontSize: '5rem',
                                color: 'rgb(18, 79, 95)',
                                position: 'relative',
                                top: '-21px',
                                margin: '0'
                        }} className={classes.Timer}>{this.state.timer}</p>
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
            </div>
        );
    }
}

export default Quiz;