import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../assets/logo.png';

import Home from '../../containers/Home/Home';
import Navigationitems from '../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to={Home}><img src={Logo} alt="Evaluiz"/></Link>
        </div>
        <nav className={classes.Nav}>
            <Navigationitems />
        </nav>
    </header>
);

export default toolbar;