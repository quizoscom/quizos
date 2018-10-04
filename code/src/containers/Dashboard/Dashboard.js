import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Dashboard.css';

import Button from '../../components/UI/Button/Button';
import UserQuizzes from '../../components/UserQuizzes/UserQuizzes';
import H2 from '../../components/PageHeading/PageHeading';
import Features from '../../components/Features/Features';

class Dashboard extends Component {
    createSelectOptions = totalRows => {
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
                    <H2>Dashboard</H2>
                    <UserQuizzes 
                        createSelectOptions={this.createSelectOptions}
                        userId={this.props.userId}
                        quizViewType="created"
                        className="qc"
                        titleStyle={{ backgroundColor: '#ffd241' }}
                        label="Quiz created by You"
                        viewType="created"
                    />
                    <UserQuizzes 
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