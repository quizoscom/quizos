import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classes from './QuizLists.css';

import NewIcon from '../../assets/new-icon.png';
import NewTabIcon from '../../assets/open-in-new-tab.png';

class QuizLists extends Component {
    state = {
        quizzes: [],
        filterBy: 'language',
        tableHeaders: ['Language', 'Total Questions', 'Av. Scores', 'Created On', 'LTD', 'Take Quiz']
    }

    componentDidMount() {
        axios.get('http://localhost/evaluiz/get/get-quiz-list.php')
        .then(res => {
            console.log(res.data);
            this.setState(prevState => ({
                quizzes: res.data
            }));
        });
    }

    selectChangeHandler = (event) => {
        this.setState(prevState => ({
            filterBy: event.target.value
        }));
    }

    render() {
        return (
            <div className={classes.QuizLists}>
                <div className={classes.selectCont}>
                    <label>Filter By</label>
                    <select onChange={this.selectChangeHandler} value={this.state.filterBy}>
                        <option value="language" disabled>Language</option>
                        <option value="React">React</option>
                        <option value="Redux">Redux</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="PHP">PHP</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            {this.state.tableHeaders.map(head => {
                                return <th className={head === 'Take Quiz' ? classes.takeQuiz: ''} key={head}>{head}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.quizzes.map(row => {
                            const av_scores = row['avergage_scores'] === 0 ? <img src={NewIcon} alt="New"/> : row['avergage_scores'] + '/10'
                            return (
                                <tr key={row['quiz_id']}>
                                    <td>{row['language']}</td>
                                    <td>{row['total_questions']}</td>
                                    <td>{av_scores}</td>
                                    <td>{row['created_at']}</td>
                                    <td>{row['last_took']}</td>
                                    <td><Link to={`/quiz/${row['language']}/${row['quiz_id']}`}><img src={NewTabIcon} alt="Take Quiz"/></Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default QuizLists;