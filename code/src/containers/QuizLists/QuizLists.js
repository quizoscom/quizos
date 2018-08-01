import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classes from './QuizLists.css';

import NewIcon from '../../assets/new-icon.png';
import NewTabIcon from '../../assets/open-in-new-tab.png';

class QuizLists extends Component {
    state = {
        quizzes: [],
        filterBy: 'select',
        sortBy: 'language',
        tableHeaders: ['language', 'total_questions', 'avergage_scores', 'created_at', 'active_point', 'Take Quiz'],
        currentOrder: {
            'language': 'asc',
            'total_questions': 'asc',
            'avergage_scores': 'asc',
            'created_at': 'asc',
            'active_point': 'asc',
        },
        languages: []
    }

    componentDidMount() {
        axios.get('http://localhost/evaluiz/get/get-quiz-list.php')
        .then(res => {
            this.setState(prevState => ({
                quizzes: res.data.quizzes,
                languages: res.data.languages
            }));
        });
    }

    filterSelectChangeHandler = (event) => {
        const value = event.target.value;
        this.setState(prevState => ({
            filterBy: value
        }));
    }

    onTableHeaderClickHandler = (sortby) => {
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

    render() {
        return (
            <div className={classes.QuizLists}>
                <div className={classes.selectCont}>
                    <div>
                        <label>Filter By</label>
                        <select onChange={this.filterSelectChangeHandler} value={this.state.filterBy}>
                            <option value="select" disabled>Select</option>
                            <option value="all">All</option>
                            {this.state.languages.map((lang, index) => {
                                return <option key={index} value={lang}>{lang}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className={classes.tableCont}>
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                {this.state.tableHeaders.map(head => {
                                    return <th 
                                              onClick={head !== 'Take Quiz' ? () => this.onTableHeaderClickHandler(head) : null}
                                              className={head === 'Take Quiz' ? classes.takeQuiz: ''} 
                                              key={head}
                                            >
                                                {head.replace(/_/g, ' ')}
                                            </th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.quizzes.map(row => {
                                const av_scores = row['avergage_scores'] === 0 ? <img src={NewIcon} alt="New"/> : row['avergage_scores'] + '/10';
                                let body = null;
                                if(row['language'] === this.state.filterBy || this.state.filterBy === 'select' || this.state.filterBy === 'all') {
                                    body = (
                                        <tr key={row['quiz_id']}>
                                            <td>{row['language']}</td>
                                            <td>{row['total_questions']}</td>
                                            <td>{av_scores}</td>
                                            <td>{row['created_at']}</td>
                                            <td>{parseFloat(row['active_point']).toFixed(2)}</td>
                                            <td><Link to={`/quiz/${row['language']}/${row['quiz_id']}`}><img src={NewTabIcon} alt="Take Quiz"/></Link></td>
                                        </tr>
                                    );
                                }
                                return body;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuizLists;