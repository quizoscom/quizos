import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';

import classes from './Dashboard.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Table from '../../components/UI/Table/Table';
import Button from '../../components/UI/Button/Button';

class Dashboard extends Component {
    state = {
        quizCreated: [
            {id: 'qc-1', language: 'React', date: '16/08/2018', users: '123456', maxMarksObt: '10/10', difficulty: 'Beginners' },
            {id: 'qc-2', language: 'Redux', date: '17/08/2018', users: '123456', maxMarksObt: '9/10', difficulty: 'Intermediate' },
            {id: 'qc-3', language: 'JavaScript', date: '20/08/2018', users: '23456', maxMarksObt: '18/10', difficulty: 'Advanced' }
        ],
        quizTaken: [
            {id: 'qt-1', language: 'React', date: '16/08/2018', timeSpent: '23:55', marksObt: '10/10', difficulty: 'Beginners' },
            {id: 'qt-2', language: 'Redux', date: '17/08/2018', timeSpent: '37:36', marksObt: '9/10', difficulty: 'Intermediate' },
            {id: 'qt-3', language: 'JavaScript', date: '20/08/2018', timeSpent: '56:15', marksObt: '18/10', difficulty: 'Advanced' }
        ],
        loadingQuizCreated: false,
        loadingQuizTook: false,
        totalRowsToBeShownQuizCreated: "10 rows",
        totalPagesQuizCreated: 0,
        totalRowsQuizCreated: 0,
        totalRowsToBeShownQuizTook: "10 rows",
        totalPagesQuizTook: 0,
        totalRowsQuizTook: 0,
        curPageNumberQuizCreated: 1,
        curPageNumberQuizTook: 1,
        prevButtonDisabledQuizCreated: true,
        nextButtonDisabledQuizCreated: false,
        prevButtonDisabledQuizTook: true,
        nextButtonDisabledQuizTook: false
    }

    componentDidMount() {
        this.fetchDataHandler(0, this.state.totalRowsToBeShownQuizCreated.replace(' rows', ''));
    }

    fetchDataHandler = (limitRowsStart, limitRowsEnd) => {
        axios.post('http://localhost/evaluiz/get/get-dashboard-details.php', qs.stringify({
            userId: this.props.userId,
            limitRowsStart: limitRowsStart,
            limitRowsEnd: limitRowsEnd
        }))
        .then(res => {
            this.setState(prevState => ({
                quizCreated: res.data.quizzes_created,
                totalPagesQuizCreated: res.data.total_pages,
                totalRowsQuizCreated: res.data.total_rows,
                totalRowsQuizTook: res.data.total_rows_quiz_took,
                totalPagesQuizTook: res.data.total_pages_quiz_took
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }

    totalRowsToBeShownQuizCreatedChangedHandler = (event) => {
        const value = event.target.value
        this.setState(prevState => ({
            totalRowsToBeShownQuizCreated: value
        }));
        this.fetchDataHandler(0, value.replace(' rows', ''));
    }

    totalRowsToBeShownQuizTookChangedHandler = (event) => {
        const value = event.target.value
        this.setState(prevState => ({
            totalRowsToBeShownQuizTook: value
        }));
        this.fetchDataHandler(0, value.replace(' rows', ''));
    }

    createSelectOptions = (totalRows) => {
        const selectOptions = ["5 rows", "10 rows", "20 rows", "25 rows", "50 rows", "100 rows"];
        let newSelectOptions = [];
        for(let i = 0; i < selectOptions.length; i++) {
            if(parseInt(totalRows, 10) < parseInt(selectOptions[i].replace(' rows', ''), 10)) {
                newSelectOptions = newSelectOptions.concat(totalRows + ' rows');
                break;
            } else {
                newSelectOptions = newSelectOptions.concat(selectOptions[i]);
            }
        }
        return newSelectOptions;
    }

    pageNumberQuizCreatedChangedHandler = (event) => {
        let value = event.target.value
        let prevDisabled = this.state.prevButtonDisabledQuizCreated;
        let nextDisabled = this.state.nextButtonDisabledQuizCreated;
        let totalPages = this.state.totalPagesQuizCreated; 
        
        if(value >= totalPages) {
            value = totalPages
            nextDisabled = true;
            prevDisabled = false;
        } else if(value <= 1) {
            value = 1
            prevDisabled = true;
            nextDisabled = false;
        } else {
            prevDisabled = true;
            nextDisabled = true;
        }
        this.setState(prevState => ({
            curPageNumberQuizCreated: value,
            prevButtonDisabledQuizCreated: prevDisabled,
            nextButtonDisabledQuizCreated: nextDisabled
        }));
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

    render() {
        const newSelectOptionsQuizCreated = this.createSelectOptions(this.state.totalRowsQuizCreated);
        const newSelectOptionsQuizTook = this.createSelectOptions(this.state.totalRowsQuizTook);
        return (
            <Aux>
                <div className={[classes.Dashboard, classes.qc].join(' ')}>
                    <p className={classes.Title} style={{
                        backgroundColor: '#ffd241'
                    }}>Quiz created by You</p>
                    <Table 
                        content={this.state.quizCreated} 
                        pagination="true" 
                        totalPages={this.state.totalPagesQuizCreated}
                        paginationRowCount={this.state.totalRowsToBeShownQuizCreated}
                        selectChanged={this.totalRowsToBeShownQuizCreatedChangedHandler}
                        inputChanged={this.pageNumberQuizCreatedChangedHandler}
                        selectOptions={newSelectOptionsQuizCreated}
                        inputValue={this.state.curPageNumberQuizCreated}
                        prevButtonDisabled={this.state.prevButtonDisabledQuizCreated}
                        nextButtonDisabled={this.state.nextButtonDisabledQuizCreated}
                    ></Table>
                </div>
                <div className={[classes.Dashboard, classes.qt].join(' ')}>
                    <p className={classes.Title}>Quiz took by You</p>
                    <Table 
                        content={this.state.quizTaken} 
                        pagination="true"
                        totalPages={this.state.totalPagesQuizTook}
                        paginationRowCount={this.state.totalRowsToBeShownQuizTook}
                        selectChanged={this.totalRowsToBeShownQuizTookChangedHandler}
                        inputChanged={this.pageNumberQuizTookChangedHandler}
                        selectOptions={newSelectOptionsQuizTook}
                        inputValue={this.state.curPageNumberQuizTook}
                        prevButtonDisabled={this.state.prevButtonDisabledQuizTook}
                        nextButtonDisabled={this.state.nextButtonDisabledQuizTook}
                    ></Table>
                </div>
                <div className={classes.ButtonGroup}>
                    <Button clicked={this.onClickTakeQuizHandler} >Take Quiz</Button>
                    <Button clicked={this.onClickCreateQuizHandler} btnType="cta">Create Quiz</Button>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(Dashboard);