import React, { Component } from 'react';
import classes from './Dashboard.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Table from '../../components/UI/Table/Table';
import Button from '../../components/UI/Button/Button';

class Dashboard extends Component {
    state = {
        quizCreated: [
            {id: 'qc-1', language: 'React', date: '16/08/2018', users: '123456', maxMarksObt: '10/10' },
            {id: 'qc-2', language: 'Redux', date: '17/08/2018', users: '123456', maxMarksObt: '9/10' },
            {id: 'qc-3', language: 'JavaScript', date: '20/08/2018', users: '23456', maxMarksObt: '18/10' }
        ],
        quizTaken: [
            {id: 'qt-1', language: 'React', date: '16/08/2018', timeSpent: '23:55', marksObt: '10/10' },
            {id: 'qt-2', language: 'Redux', date: '17/08/2018', timeSpent: '37:36', marksObt: '9/10' },
            {id: 'qt-3', language: 'JavaScript', date: '20/08/2018', timeSpent: '56:15', marksObt: '18/10' }
        ]
    }

    render() {
        return (
            <Aux>
                <div className={[classes.Dashboard, classes.qc].join(' ')}>
                    <p className={classes.Title}>Quiz created by You</p>
                    <Table content={this.state.quizCreated}></Table>
                </div>
                <div className={[classes.Dashboard, classes.qt].join(' ')}>
                    <p className={classes.Title}>Quiz taken by You</p>
                    <Table content={this.state.quizTaken}></Table>
                </div>
                <div className={classes.ButtonGroup}>
                    <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                    <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                </div>
            </Aux>
        );
    }
}

export default Dashboard;