import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Sidebar/Sidebar';

import classes from './Layout.css';

const layout = props => (
    <div id="outer-container">
        <Toolbar isAuth={props.isAuth} isQuizActive={props.isQuizActive} />
        { !props.isQuizActive ? <Sidebar isAuth={props.isAuth} isQuizActive={props.isQuizActive} /> : null }
        <main className={classes.Content} id="page-wrap">
            {props.children}
        </main>
    </div>
);

export default layout