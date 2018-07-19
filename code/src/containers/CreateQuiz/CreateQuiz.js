import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CreateQuiz.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';

class CreateQuiz extends Component {
    state = {
        selectedLanguage: '',
        noOfQuestions: 0,
        questions: [],
        // questions: [
        //     {question: 'In React, What method is used to update the state?', choices: ['updateState()', 'changeState()', 'setState()', 'stateChange()'], answer: 3},
        //     {question: 'What function allows you to render React content in an HTML page?', choices: ['ReactDOM.start()', 'React.render()', 'ReactDOM.render()', 'React.mount()'], answer: 3}
        // ],
        currentQuestionNo: 0,
        creatingQuiz: false,
        currentAnswer: 0,
        nextQuestion: 0,
    }

    selectChangeHandler = (event) => {
        this.setState({
            ...this.state,
            selectedLanguage: event.target.value
        });
    }

    noOfQuestionInputChangedHandler = (event) => {
        this.setState({
            ...this.state,
            noOfQuestions: parseInt(event.target.value, 10)
        })
    }

    onQuestionInputChangedHandler = (event) => {
        var newQuestions = this.state.questions.slice();
        if(newQuestions.length === 0) {
            newQuestions.push({
                question: event.target.value,
                choices: [],
                answer: 0
            });
        } else {
            newQuestions[this.state.currentQuestionNo-1] = {
                question: event.target.value,
                choices: [],
                answer: 0
            };
        }
        this.setState(prevState => ({
            questions: newQuestions
        }));
    }

    onChoiceInputsChangedHandler = (event, index) => {
        var currentQUestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        var newChoices = newQuestions[currentQUestionNo-1].choices.slice();

        if(newChoices[index-1] === undefined) {
            newChoices.splice(index-1, 0, event.target.value);
        } else {
            newChoices[index-1] = event.target.value;
        }

        if(newQuestions.length !== 0) {
            newQuestions[currentQUestionNo-1].choices = newChoices;
        }
        this.setState(prevState => ({
            questions: newQuestions
        }));
    }

    onAnswerSelectHandler = (ca) => {
        var currentQuestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        newQuestions[currentQuestionNo-1].answer = ca;
        this.setState(prevState => ({
            currentAnswer: ca
        }));
        this.setState(prevState => ({
            questions: newQuestions
        }));
    }

    continueButtonClickHandler = (event) => {
        if(this.state.selectedLanguage !== "" && this.state.selectedLanguage !== undefined && this.state.selectedLanguage !== "select" && this.state.noOfQuestions !== 0) {
            if(this.state.currentQuestionNo === 0) {
                this.setState({
                    ...this.state,
                    creatingQuiz: true,
                    currentQuestionNo: 1
                });
                console.log(this.state.noOfQuestions);
            } else {
                this.setState(prevState => ({
                    currentQuestionNo: prevState.currentQuestionNo + 1
                }));
                this.setState(prevState => ({
                    nextQuestion: 1
                }));
                // clear the complete form for new question and choices
            }
        } else {
            // show better designed error alert
            alert('Please Select the language and no of questions to start creating quiz');
        }
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
                        <Input 
                            changed={this.noOfQuestionInputChangedHandler} 
                            inputType="number" 
                            className="noq"
                            value={false}
                        ></Input>
                    </div>
                </Aux>
            );
        } else {
            console.log(this.state.noOfQuestions);
            body = (
                <Aux>
                    {this.state.currentQuestionNo !== 0 ? <p className={classes.questionSNo}>Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p> : null}
                    <Question 
                        changed={this.onQuestionInputChangedHandler} 
                        value={this.state.nextQuestion === 1}
                    />
                    <Choices 
                        changed={this.onChoiceInputsChangedHandler} 
                        clicked={this.onAnswerSelectHandler} 
                        answer={this.state.currentAnswer}
                        value={this.state.nextQuestion === 1}
                    />
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

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CreateQuiz);