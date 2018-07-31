import React from 'react';

import classes from './NavigationItems.css';
import githubIcon from '../../../assets/git-icon.png' 

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let body = null;
    if(!props.isQuizActive) {
        if(props.isAuth) {
            body = (
                <Aux>
                    <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                    <NavigationItem link="/create-quiz">Create Quiz</NavigationItem>
                    <NavigationItem link="/available-quizzes">Take Quiz</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </Aux>
            );
        } else {
            body = <NavigationItem link="/auth">Login</NavigationItem>;
        }
    }

    let dom = null;
    if(!props.isQuizActive) {
        dom = (
            <Aux>
                <NavigationItem exact link="/">Home</NavigationItem>
                {body}
                <NavigationItem git link="https://github.com/entrepaman/quiz-creator" className="gitLink"><img className={classes.Img} src={githubIcon} alt="Git Link"/></NavigationItem>
            </Aux>
        );
    } else {
        dom = body;
    }
    return (
        <ul className={classes.NavigationItems}>
            {dom}
        </ul>
    );
};

export default navigationItems;