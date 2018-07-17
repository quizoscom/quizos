import React from 'react';

import classes from './NavigationItems.css';
import githubIcon from '../../../assets/git-icon.png' 

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/dashboard">Dashboard</NavigationItem>
        <NavigationItem link="/create-quiz">Create Quiz</NavigationItem>
        <NavigationItem link="/quiz">Quiz</NavigationItem>
        <NavigationItem git link="https://github.com/entrepaman/quiz-creator" className="gitLink"><img className={classes.Img} src={githubIcon} alt="Git Link"/></NavigationItem>
    </ul>
);

export default navigationItems;