import React from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu'; // https://github.com/negomi/react-burger-menu

import Logo from '../../assets/logo.png';

import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './Sidebar.css';

const sidebar = (props) => {
    const style = {
        display: 'block',
        top: '0',
        margin: '1.8em 0',
        textAlign: 'left',
        padding: '0 21px'
    }
    return (
        <Menu 
            burgerButtonClassName={classes.burgerButton} 
            menuClassName={classes.Menu} 
            pageWrapId={"page-wrap"} 
            outerContainerId={"outer-container"}
            width={210}
        >
            <Link to="/"><img src={Logo} alt="Evaluiz"/></Link>
            <NavigationItem style={style} className="onlyMobile" link="/dashboard">Dashboard</NavigationItem>
            <NavigationItem style={style} className="onlyMobile" link="/create-quiz">Create Quiz</NavigationItem>
            <NavigationItem style={style} className="onlyMobile" link="/available-quizzes">Take Quiz</NavigationItem>
            <NavigationItem style={style} className="onlyMobile" link="/logout">Logout</NavigationItem>
        </Menu>
    );
}

export default sidebar;