import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import Table from '../UI/Table/Table';
import Loader from '../UI/Loader/Loader';
import Pagination from '../Pagination/Pagination';

import classes from './QuizCreateView.css';

class QuizCreateView extends Component {
    state = {
        quizzes: [],
        loading: true,
        totalRowsToBeShown: "10 rows",
        totalPages: 0,
        totalRows: 0,
        curPageNumber: 1,
        prevButtonDisabled: true,
        nextButtonDisabled: false
    }

    componentDidMount() {
        this.fetchDataHandler(0, this.state.totalRowsToBeShown.replace(' rows', ''));
    }

    fetchDataHandler = (limitRowsStart, limitRowsEnd) => {
        let url = "http://localhost/evaluiz/get/get-dashboard-details.php";
        if(this.props.quizViewType === "created") {
            url+= "?created"
        } else {
            url+= "?took"
        }
        axios.post(url, qs.stringify({
            userId: this.props.userId,
            limitRowsStart: limitRowsStart,
            limitRowsEnd: limitRowsEnd
        }))
        .then(res => {
            this.setState(prevState => ({
                quizzes: res.data.quizzes,
                totalPages: res.data.total_pages,
                totalRows: res.data.total_rows,
                loading: false
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }

    totalRowsToBeShownChangedHandler = (event) => {
        const value = event.target.value
        this.setState(prevState => ({
            totalRowsToBeShown: value
        }));
        this.fetchDataHandler(0, value.replace(' rows', ''));
    }

    prevButtonClickHandler = () => {
        let prevDisabled = this.state.prevButtonDisabled;
        let nextDisabled = this.state.nextButtonDisabled;
        let totalPages = this.state.totalPages;
        var currentPageNumber = this.state.curPageNumber;

        if(currentPageNumber <= totalPages && currentPageNumber > 1) {
            currentPageNumber--;
            nextDisabled = false;
            if(currentPageNumber <= 1) {
                prevDisabled = true;
            } else {
                prevDisabled = false;
            }
        } else if(currentPageNumber <= 1) {
            currentPageNumber = 1;
            prevDisabled = true;
            nextDisabled = false;
        } else {
            prevDisabled = true;
            nextDisabled = true;
        }

        this.setState(prevState => ({
            curPageNumber: currentPageNumber,
            prevButtonDisabled: prevDisabled,
            nextButtonDisabled: nextDisabled
        }));
    }

    nextButtonClickHandler = () => {
        let prevDisabled = this.state.prevButtonDisabled;
        let nextDisabled = this.state.nextButtonDisabled;
        let totalPages = this.state.totalPages;
        var currentPageNumber = this.state.curPageNumber;

        if(currentPageNumber < totalPages && currentPageNumber >= 1) {
            currentPageNumber++;
            prevDisabled = false;
            if(currentPageNumber >= totalPages) {
                nextDisabled = true;
            } else {
                nextDisabled = false;
            }
        } else if(currentPageNumber >= totalPages) {
            currentPageNumber = totalPages;
            prevDisabled = false;
            nextDisabled = true;
        } else {
            prevDisabled = true;
            nextDisabled = true;
        }

        this.setState(prevState => ({
            curPageNumber: currentPageNumber,
            prevButtonDisabled: prevDisabled,
            nextButtonDisabled: nextDisabled
        }));
    }

    pageNumberInputChangedHandler = (event) => {
        let value = event.target.value
        let prevDisabled = this.state.prevButtonDisabled;
        let nextDisabled = this.state.nextButtonDisabled;
        let totalPages = this.state.totalPages;
        
        if(value >= totalPages) {
            value = totalPages
            nextDisabled = true;
            prevDisabled = false;
        } else if(value <= 1) {
            value = 1
            prevDisabled = true;
            nextDisabled = false;
        } else {
            prevDisabled = false;
            nextDisabled = false;
        }
        this.setState(prevState => ({
            curPageNumber: value,
            prevButtonDisabled: prevDisabled,
            nextButtonDisabled: nextDisabled
        }));

        const totalRowsToBeShown = parseInt(this.state.totalRowsToBeShown.replace(' rows', ''), 10);
        console.log('limitRowsStart = ', totalRowsToBeShown*value);
        console.log('limitRowsEnd = ', totalRowsToBeShown*value + totalRowsToBeShown);
    }

    render() {
        const newSelectOptions = this.props.createSelectOptions(this.state.totalRows);
        let body = <Loader loaderStyle={{left: '-40px'}} loader2Style={{left: '40px'}}/>;
        if(!this.state.loading) {
            body = (
                <div className={[classes.QuizCreateView, classes[this.props.className]].join(' ')}>
                    <p className={classes.Title} style={this.props.titleStyle}>{this.props.label}</p>
                    <Table 
                        content={this.state.quizzes}
                        viewType={this.props.viewType}
                    ></Table>
                    <Pagination 
                        paginationRowCount={this.state.totalRowsToBeShown}
                        selectChanged={this.totalRowsToBeShownChangedHandler}
                        inputChanged={this.pageNumberInputChangedHandler}
                        totalPages={this.state.totalPages}
                        selectOptions={newSelectOptions}
                        inputValue={this.state.curPageNumber}
                        prevButtonDisabled={this.state.prevButtonDisabled}
                        nextButtonDisabled={this.state.nextButtonDisabled}
                        prevButtonClicked={this.prevButtonClickHandler}
                        nextButtonClicked={this.nextButtonClickHandler}
                    />
                </div>
            );
        }
        return body;
    }
}

export default QuizCreateView;