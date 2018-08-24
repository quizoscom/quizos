import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    const classNames = [classes.NavigationItem, classes[props.className]].join(' ');
    return (
        <li onClick={props.clicked} className={classNames} style={props.style}>
            {
                props.git 
                ? <a className={classes.git} href={props.link}> {props.children} </a>
                : <NavLink exact={props.exact} to={props.link} activeClassName={classes.selected}> {props.children} </NavLink>
            }
        </li>
    );
}
    

export default navigationItem;