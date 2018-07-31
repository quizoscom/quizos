import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../../assets/logo.png';

import Navigationitems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to="/"><img src={Logo} alt="Evaluiz"/></Link>
        </div>
        <nav className={classes.Nav}>
            <Navigationitems isAuth={props.isAuth} isQuizActive={props.isQuizActive} />
        </nav>
    </header>
);

export default toolbar;