import React, { Component } from 'react';

import classes from './CreateQuiz.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';

class CreateQuiz extends Component {
    state = {
        selectedLanguage: '',
        noOfQuestions: 10,
        questions: [
            {question: 'In React, What method is used to update the state?', choices: ['updateState()', 'changeState()', 'setState()', 'stateChange()'], answer: 3},
            {question: 'What function allows you to render React content in an HTML page?', choices: ['ReactDOM.start()', 'React.render()', 'ReactDOM.render()', 'React.mount()'], answer: 3}
        ],
        currentQuestionNo: 1,
        creatingQuiz: true,
        answer: 0
    }

    selectChangeHandler = (event) => {
        this.setState({
            ...this.state,
            selectedLanguage: event.target.value
        });
    }

    inputChangedHandler = (event) => {
        this.setState({
            ...this.state,
            noOfQuestions: parseInt(event.target.value, 10)
        })
    }

    continueButtonClickHandler = (event) => {
        if(this.state.selectedLanguage !== "" && this.state.selectedLanguage !== undefined && this.state.selectedLanguage !== "select" && this.state.noOfQuestions !== 0) {
            if(this.state.currentQuestionNo === 0) {
                this.setState({
                    ...this.state,
                    creatingQuiz: true,
                    noOfQuestions: event.target.value,
                    currentQuestionNo: 1
                });
            } else {
                this.setState(prevState => ({
                    currentQuestionNo: prevState.currentQuestionNo + 1
                }));
                // clear the complete form for new question and choices
            }
        } else {
            alert('Please Select the language and no of questions to start creating quiz');
        }
    }

    onQuestionInputChangedHandler = (event) => {
        console.log(event.target.value);
    }

    onChoiceInputsChangedHandler = (event) => {
        console.log('choices changed');
    }

    onAnswerSelectHandler = (ca) => {
        this.setState(prevState => ({
            answer: ca
        }))
    }

    render() {
        let body = '';
        if(this.state.creatingQuiz === false) {
            body = (
                <Aux>
                    <div className={classes.selectCont}>
                        <label>Choose Your Language</label>
                        <select onChange={this.selectChangeHandler} defaultValue="select">
                            <option value="select" disabled>Select</option>
                            <option value="React">React</option>
                            <option value="Redux">Redux</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="PHP">PHP</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>
                    <div className={classes.noOfQuestions}>
                        <label htmlFor="">No of Questions</label>
                        <Input changed={this.inputChangedHandler} inputType="number" className="noq"></Input>
                    </div>
                </Aux>
            );
        } else {
            body = (
                <Aux>
                    {this.state.currentQuestionNo !== 0 ? <p className={classes.questionSNo}>Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p> : null}
                    <Question changed={this.onQuestionInputChangedHandler} />
                    <Choices changed={this.onChoiceInputsChangedHandler} clicked={this.onAnswerSelectHandler} answer={this.state.answer} />
                </Aux>
            );
        }
        return (
            <div className={classes.CreateQuiz}>
                {body}
                <Button btnType="cta" clicked={this.continueButtonClickHandler} className="quiz-continue-btn" >Continue</Button>
            </div> 
        );
    }
}

export default CreateQuiz;