# UserQuizzes.js

{% hint style="info" %}
class based component
{% endhint %}



### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| quizzes | Array | \[ \] | a local state to store quizzes created or took by the user fetched from the database  |
| loading | bool | true |  |
| totalRowsToBeShown | String | "10 Rows" | total rows to be shown label |
| totalPages | Number | 0 | total number of Pages based on totalRowsToBeShown fetched from database  |
| totalRows | Number | 0 | total number of Pages based on totalRowsToBeShown fetched from database  |
| curPageNumber | Number | 1 | track current page number for pagination events |
| prevButtonDisabled | bool | true | previous button should be disabled or not in Pagination Component |
| nextButtonDisabled | bool | false | previous button should be disabled or not in Pagination Component |



### functions

| name | params | description |
| :--- | :--- | :--- |
| componentDidMount |  | call fetchDataHandler |
| fetchDataHandler | limitRowsStart, limit | fetch quizzes data for a user from the database according to limit parameters |
| totalRowsToBeShownChangedHandler | event | total rows select changed handler |
| prevButtonClickHandler |  | previous button clicked handler |
| nextButtonClickHandler |  | next button clicked handler |
| pageNumberInputChangedHandler |  | page number input changed handler |



### store props

| name | link |
| :--- | :--- |
| alertMsg, alertType | link to alert reducer |



### store actions

| name | link |
| :--- | :--- |
| onShowAlert, onHideAlert | link to alert actions |
| onSetNewUser | link to auth actions |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UserQuizzes/UserQuizzes.js" %}
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import Table from '../UI/Table/Table';
import Loader from '../UI/Loader/Loader';
import Alert from '../UI/Alert/Alert';

import Pagination from '../Pagination/Pagination';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './UserQuizzes.css';

import * as actions from '../../store/actions';
import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';

class QuizCreateView extends Component {
    state = {
        quizzes: [],
        loading: true,
        totalRowsToBeShown: "10 rows",
        totalPages: 0,
        totalRows: 0,
        curPageNumber: 1,
        prevButtonDisabled: true,
        nextButtonDisabled: false,
    }

    componentDidMount() {
        this.fetchDataHandler(0, this.state.totalRowsToBeShown.replace(' rows', ''));
    }

    fetchDataHandler = (limitRowsStart, limit) => {
        let url = `${SERVER_ROOT_URL}/get/get-dashboard-details.php`;
        if(this.props.quizViewType === "created") {
            url+= "?created"
        } else {
            url+= "?took"
        }

        axios.post(url, qs.stringify({
            userId: this.props.userId,
            limitRowsStart: limitRowsStart,
            limit: limit
        }))
        .then(res => {
            if(typeof res.data.quizzes.length !== "undefined") {
                if(res.data.status === 'success') {
                    let prevButtonDisabled = this.state.prevButtonDisabled;
                    let nextButtonDisabled = this.state.nextButtonDisabled;
                    if(res.data.total_pages === 1) {
                        prevButtonDisabled = true;
                        nextButtonDisabled = true;
                    } else if(this.state.curPageNumber === res.data.total_pages) {
                        prevButtonDisabled = false;
                        nextButtonDisabled = true;
                    } else {
                        prevButtonDisabled = true;
                        nextButtonDisabled = false;
                    }
                    this.setState(prevState => ({
                        quizzes: res.data.quizzes,
                        totalPages: res.data.total_pages,
                        totalRows: res.data.total_rows,
                        prevButtonDisabled: prevButtonDisabled,
                        nextButtonDisabled: nextButtonDisabled,
                        loading: false
                    }));
                } else {
                    this.props.onShowAlert(SERVER_ERROR_MSG, 'failed');
                }
            } else {
                this.props.onSetNewUser();
            }
        })
        .catch(err => {
            this.props.onShowAlert(SERVER_ERROR_MSG, 'failed');
        });
    }

    totalRowsToBeShownChangedHandler = event => {
        const value = event.target.value
        this.setState(prevState => ({
            totalRowsToBeShown: value,
            curPageNumber: 1
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

        const totalRowsToBeShown = parseInt(this.state.totalRowsToBeShown.replace(' rows', ''), 10);
        const limitRowsStart = parseInt(totalRowsToBeShown*(currentPageNumber-1), 10);
        this.fetchDataHandler(limitRowsStart, totalRowsToBeShown);

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

        const totalRowsToBeShown = parseInt(this.state.totalRowsToBeShown.replace(' rows', ''), 10);
        const limitRowsStart = parseInt(totalRowsToBeShown*(currentPageNumber-1), 10);
        this.fetchDataHandler(limitRowsStart, totalRowsToBeShown);

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
        const limitRowsStart = parseInt(totalRowsToBeShown*(value-1), 10);
        this.fetchDataHandler(limitRowsStart, totalRowsToBeShown);
    }

    render() {
        const newSelectOptions = this.props.createSelectOptions(this.state.totalRows);
        let body = <Loader loaderStyle={{left: '-40px'}} loader2Style={{left: '40px'}}/>;
        if(!this.state.loading) {
            body = (
                <div className={[classes.UserQuizzes, classes[this.props.className]].join(' ')}>
                    <p className={classes.Title} style={this.props.titleStyle}>{this.props.label}</p>
                    <div className={classes.TableCont}>
                        <Table 
                            content={this.state.quizzes}
                            viewType={this.props.viewType}
                        ></Table>
                    </div>
                    <Pagination
                        totalRows={this.state.totalRows}
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
        return (
            <Aux>
                {
                    this.props.alertMsg !== ''
                    ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                    : null
                }
                {body}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alert.alertMsg,
        alertType: state.alert.alertType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
        onHideAlert: () => dispatch(actions.hideAlert()),
        onSetNewUser: () => dispatch(actions.setNewUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreateView);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

