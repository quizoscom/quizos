import React from 'react';

import classes from './NavigationItems.css';
import githubIcon from '../../../assets/git-icon.png' 

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let body = null;
    if(props.isAuth) {
        body = (
            <Aux>
                <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                <NavigationItem link="/create-quiz">Create Quiz</NavigationItem>
                <NavigationItem link="/quiz">Take Quiz</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem> 
            </Aux>
        );
    } else {
        body = <NavigationItem link="/auth">Login</NavigationItem>;
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">Home</NavigationItem>
            {body}
            <NavigationItem git link="https://github.com/entrepaman/quiz-creator" className="gitLink"><img className={classes.Img} src={githubIcon} alt="Git Link"/></NavigationItem>
        </ul>
    );
};

export default navigationItems;