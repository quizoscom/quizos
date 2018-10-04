# QuizLists.js

{% hint style="info" %}
class based component
{% endhint %}



### states

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| quizzes | Array | \[ \] | all quizzes fetched from database |
| filterBy | String | select | selected filter by option |
| sortBy | String | language | sort by header click |
| completeSortyBy | String | latest | selected sort by option |
| tableHeaders | Array \[ \] | \['language', 'total\_questions', 'total\_users', 'avergage\_scores', 'avg\_rating', 'created\_at', 'Take Quiz'\] |  |
| currentOrder | Object | { 'language': '', 'total\_questions': '', 'total\_users': '', 'created\_at': 'desc', 'avg\_rating': '' } |  |
| languages | Array | \[ \] | languages fetched  from database |
| loading | bool | true | loading when page is loaded |
| loadingMore | bool | false | loader when load more button is clicked |
| totalRowsToBeLoaded | Number | 10 | total number of quizzes to be loaded at first |
| removeLoadMore | bool | false | show or hide load more button below quizzes list |



### functions

| name | params | description |
| :--- | :--- | :--- |
| componentDidMount |  | call fetchData |
| fetchData | limitStart, orderBy, filterBy | fetch quizzes from the database |
| filterSelectChangeHandler | event | filter by changed handler |
| sortSelectChangeHandler | event | sort by changed handler |
| onTableHeaderClickHandler | sortby | table header clicked handler \(sort according to that\) |
| onLoadMoreButtonClickedHandler |  | load more button clicked handler |



### store props

| name | link |
| :--- | :--- |
| alertMsg, alertType | link to alert reducer |



### store actions

| name | link |
| :--- | :--- |
| onShowAlert, onHideAlert | link to alert actions |



### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/QuizLists/QuizLists.js" %}
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { Link } from 'react-router-dom';

import classes from './QuizLists.css';
import NewTabIcon from '../../assets/open-in-new-tab.png';

import Select from '../../components/UI/Select/Select';
import Loader from '../../components/UI/Loader/Loader';
import InlineLoader from '../../components/UI/InlineLoader/InlineLoader';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import H2 from '../../components/PageHeading/PageHeading';

import * as actions from '../../store/actions';
import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';

import Aux from '../../hoc/Auxiliary/Auxiliary';

class QuizLists extends Component {
    state = {
        quizzes: [],
        filterBy: 'select',
        sortBy: 'language',
        completeSortyBy: 'latest',
        tableHeaders: ['language', 'total_questions', 'total_users', 'avergage_scores', 'avg_rating', 'created_at', 'Take Quiz'],
        currentOrder: {
            'language': '',
            'total_questions': '',
            'total_users': '',
            'created_at': 'desc',
            'avg_rating': ''
        },
        languages: [],
        loading: true,
        loadingMore: false,
        totalRowsToBeLoaded: 10,
        limitStart: 0,
        removeLoadMore: false
    }

    componentDidMount() {
        this.fetchData(this.state.limitStart, this.state.completeSortyBy, this.state.filterBy);
    }

    fetchData = (limitStart, orderBy, filterBy) => {
        if(this.state.quizzes.length === 0) {
            this.setState(prevState => ({
                loading: true
            }));
        } else {
            this.setState(prevState => ({
                loadingMore: true
            }));
        }
        axios.post(`${SERVER_ROOT_URL}/get/get-quiz-list.php`, qs.stringify({
            totalRows: this.state.totalRowsToBeLoaded,
            limitStart: limitStart,
            orderBy: orderBy,
            filterBy: filterBy
        }))
        .then(res => {
            if(typeof res.data.quizzes !== "undefined") {
                const quizzes = this.state.quizzes.slice();
                let newQuizzes = quizzes.concat(res.data.quizzes);
                let newLanguages = [];
                for(let i = 0; i < res.data.languages.length; i++) {
                    newLanguages = newLanguages.concat({
                        value: res.data.languages[i],
                        label: res.data.languages[i]
                    });
                }
                this.setState(prevState => ({
                    quizzes: newQuizzes,
                    languages: newLanguages,
                    loading: false,
                    loadingMore: false
                }));
                if(res.data.quizzes.length < this.state.totalRowsToBeLoaded) {
                    this.setState(prevState => ({
                        removeLoadMore: 1,
                        loadingMore: false
                    }));
                }
            } else {
                this.setState(prevState => ({
                    removeLoadMore: 1,
                    loadingMore: false
                }));
            }
        })
        .catch(err => {
            this.props.onShowAlert(SERVER_ERROR_MSG, 'failed');
        });
    }

    filterSelectChangeHandler = event => {
        const value = event.value;
        this.setState(prevState => ({
            filterBy: value,
            quizzes: [],
            removeLoadMore: 0,
            limitStart: 0
        }));
        this.fetchData(0, this.state.completeSortyBy, value);
    }

    sortSelectChangeHandler = event => {
        const value = event.value;
        this.setState(prevState => ({
            completeSortyBy: value,
            quizzes: [],
            removeLoadMore: 0,
            limitStart: 0
        }));
        this.fetchData(0, value, this.state.filterBy);
    }

    onTableHeaderClickHandler = sortby => {
        let newCurrentOrder = Object.assign({}, this.state.currentOrder);
        const newQuizArr = this.state.quizzes.slice();
        let sortableObject = {};

        for(let i = 0; i < newQuizArr.length; i++) {
            sortableObject['' + i] = newQuizArr[i][sortby]
        }

        let keysSorted = null;

        if(sortby === 'created_at') {
            keysSorted = Object.keys(sortableObject).sort(function(a,b) {
                const partsA = sortableObject[a].split('/');
                const dateA = new Date(partsA[2], partsA[1], partsA[0]);

                const partsB = sortableObject[b].split('/');
                const dateB = new Date(partsB[2], partsB[1], partsB[0]);

                if(newCurrentOrder[sortby] === 'desc') {
                    return dateA.getTime() - dateB.getTime();
                } else {
                    return dateB.getTime() - dateA.getTime();
                }
                
            });
        } else if(sortby === 'language') {
            keysSorted = Object.keys(sortableObject).sort(function(a,b) {
                var x = sortableObject[a].toLowerCase();
                var y = sortableObject[b].toLowerCase();
                if(newCurrentOrder[sortby] === 'desc') {
                    return x > y ? -1 : x < y ? 1 : 0;
                } else {
                    return x < y ? -1 : x > y ? 1 : 0;
                }
            });
        } else {
            if(newCurrentOrder[sortby] === 'desc') {
                keysSorted = Object.keys(sortableObject).sort(function(a,b) {
                    return sortableObject[a] - sortableObject[b]
                });
            } else {
                keysSorted = Object.keys(sortableObject).sort(function(a,b) {
                    return sortableObject[b] - sortableObject[a]
                });
            }
            
        }

        let sortedQuizzes = [];
        for(let i = 0; i < keysSorted.length; i++) {
            sortedQuizzes[i] = newQuizArr[keysSorted[i]]
        }

        newCurrentOrder[sortby] = newCurrentOrder[sortby] === 'asc' ? 'desc' : 'asc';

        this.setState(prevState => ({
            currentOrder: newCurrentOrder,
            quizzes: sortedQuizzes
        }));
    }

    onLoadMoreButtonClickedHandler = () => {
        const limitStart = this.state.limitStart + this.state.totalRowsToBeLoaded
        this.setState(prevState => ({
            limitStart: limitStart
        }));
        this.fetchData(limitStart, this.state.completeSortyBy, this.state.filterBy);
    }

    render() {
        let sortByOptions = [];
        let currentOrderKeys = Object.keys(this.state.currentOrder);
        for(let i = 0; i < currentOrderKeys.length; i++) {
            sortByOptions = sortByOptions.concat({ value: currentOrderKeys[i], label: currentOrderKeys[i].toString().replace(/_/g, ' ') })
        }

        let body = <Loader loaderStyle={{left: '-40px'}} loader2Style={{left: '40px'}}/>;
        if(this.state.loading === false) {
            body = (
                <Aux>
                    <H2>Available Quizzes</H2>
                    <div className={classes.selectCont}>
                        <div>
                            <label>Filter By</label>
                            {
                                this.state.languages.length !== 0
                                ? <Select
                                    changed={this.filterSelectChangeHandler}
                                    defaultValue={this.state.filterBy}
                                    options={[{value: "All", label: "All"}].concat(this.state.languages)}
                                    isSearchable={true}
                                  />
                                : null
                            }
                        </div>
                        <div>
                            <label>Sort By</label>
                            <Select
                                changed={this.sortSelectChangeHandler}
                                defaultValue={this.state.completeSortyBy}
                                options={sortByOptions}
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className={classes.TableCont}>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    {this.state.tableHeaders.map(head => {
                                        let style = null;
                                        if(this.state.currentOrder[head] === 'desc') {
                                            style = {borderBottom: '1px solid'}
                                        } else if(this.state.currentOrder[head] === 'asc') {
                                            style = {borderTop: '1px solid'}
                                        }
                                        return <th 
                                                onClick={head !== 'Take Quiz' ? () => this.onTableHeaderClickHandler(head) : null}
                                                className={head === 'Take Quiz' ? classes.takeQuiz: ''} 
                                                key={head}
                                                style={style}
                                                >
                                                    {head.replace(/_/g, ' ')}
                                                </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.quizzes.map(row => {
                                    const avScores = row['avergage_scores'] === 0 ? '-' : Math.ceil(parseFloat(row['avergage_scores'])) + '/' + row['total_questions'];
                                    const totalUsers = row['total_users'] === 0 ? '-' : Math.ceil(parseFloat(row['total_users']));
                                    const ratings = row['avg_rating'] !== 0 ? parseFloat(row['avg_rating']).toFixed(1) : '-';
                                    let body = null;
                                    if(row['language'] === this.state.filterBy || this.state.filterBy === 'select' || this.state.filterBy === 'All') {
                                        body = (
                                            <tr key={row['quiz_id']}>
                                                <td>{row['language']}</td>
                                                <td>{row['total_questions']}</td>
                                                <td>{totalUsers}</td>
                                                <td>{avScores}</td>
                                                <td>{ratings}</td>
                                                <td>{row['created_at']}</td>
                                                <td><Link to={`/quiz/${row['language']}/${row['quiz_id']}`}><img src={NewTabIcon} alt="Take Quiz"/></Link></td>
                                            </tr>
                                        );
                                    }
                                    return body;
                                })}
                            </tbody>
                        </table>
                    </div>
                    {this.state.loadingMore ? <InlineLoader /> : null}
                    {!this.state.removeLoadMore ? <Button clicked={this.onLoadMoreButtonClickedHandler} disabled={this.state.loadingMore}>Load more</Button> : <p className={classes.thatsAll}>That's all</p> }
                </Aux>
            );
        }
        return (
            <div className={classes.QuizLists}>
                {
                    this.props.alertMsg !== ''
                    ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                    : null
                }
                {body}
            </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizLists);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

