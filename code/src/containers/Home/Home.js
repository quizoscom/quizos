import React, { Component } from 'react';

import classes from './Home.css';
import questionMark from '../../assets/question-mark-icon.png';

import Button from '../../components/UI/Button/Button';

class Home extends Component {
    onClickTakeQuizHandler = () => {
        console.log('take quiz');
    }

    onClickCreateQuizHandler = () => {
        console.log('create quiz');
    }

    render() {
        return (
            <div className={classes.Home}>
                <img src={questionMark} alt=""/>
                <p>Easiest Way to Create or Take A Quiz</p>
                <p className={classes.Subtitle}>(It's free to use forever)</p>
                <div className={classes.ButtonGroup}>
                    <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                    <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                </div>
            </div>
        );
    }
}

export default Home;