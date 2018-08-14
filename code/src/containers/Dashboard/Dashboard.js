import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Dashboard.css';

import Button from '../../components/UI/Button/Button';
import QuizCreateView from '../../components/QuizCreateView/QuizCreateView';

import Features from '../../components/Features/Features';

class Dashboard extends Component {
    state = {
        loadingQuizTook: false,
        totalRowsToBeShownQuizTook: "10 rows",
        totalPagesQuizTook: 0,
        totalRowsQuizTook: 0,
        curPageNumberQuizTook: 1,
        prevButtonDisabledQuizTook: true,
        nextButtonDisabledQuizTook: false
    }

    totalRowsToBeShownQuizTookChangedHandler = (event) => {
        const value = event.target.value
        this.setState(prevState => ({
            totalRowsToBeShownQuizTook: value
        }));
        // this.fetchDataHandler(0, value.replace(' rows', ''));
    }

    createSelectOptions = (totalRows) => {
        const selectOptions = ["5 rows", "10 rows", "20 rows", "25 rows", "50 rows", "100 rows"];
        let newSelectOptions = [];
        for(let i = 0; i < selectOptions.length; i++) {
            if(parseInt(totalRows, 10) <= parseInt(selectOptions[i].replace(' rows', ''), 10)) {
                newSelectOptions = newSelectOptions.concat(totalRows + ' rows');
                break;
            } else {
                newSelectOptions = newSelectOptions.concat(selectOptions[i]);
            }
        }
        return newSelectOptions;
    }

    pageNumberQuizTookChangedHandler = (event) => {
        let value = event.target.value
        let prevDisabled = this.state.prevButtonDisabledQuizTook;
        let nextDisabled = this.state.nextButtonDisabledQuizTook;
        let totalPages = this.state.totalPagesQuizTook

        if(value >= totalPages ) {
            value = totalPages
            nextDisabled = true;
            prevDisabled = false;
        } else if(value < 1) {
            value = 1
            prevDisabled = true;
            nextDisabled = false;
        } else {
            prevDisabled = true;
            nextDisabled = true;
        }
        this.setState(prevState => ({
            curPageNumberQuizTook: value,
            prevButtonDisabledQuizTook: prevDisabled,
            nextButtonDisabledQuizTook: nextDisabled
        }));
    }

    onClickTakeQuizHandler = () => {
        this.props.history.push("/available-quizzes");
    }

    onClickCreateQuizHandler = () => {
        this.props.history.push("/create-quiz");
    }

    render() {
        let body = <Features />;
        if(!this.props.newUser) {
            body = (
                <div className={classes.Dashboard}>
                    <QuizCreateView 
                        createSelectOptions={this.createSelectOptions}
                        userId={this.props.userId}
                        quizViewType="created"
                        className="qc"
                        titleStyle={{ backgroundColor: '#ffd241' }}
                        label="Quiz created by You"
                        viewType="created"
                    />
                    <QuizCreateView 
                        createSelectOptions={this.createSelectOptions}
                        userId={this.props.userId}
                        quizViewType="took"
                        className="qt"
                        label="Quiz took by You"
                        viewType="took"
                    />
                    <div className={classes.ButtonGroup}>
                        <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                        <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                    </div>
                </div>
            );
        }
        return body;
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        newUser: state.auth.newUser
    }
}

export default connect(mapStateToProps)(Dashboard);