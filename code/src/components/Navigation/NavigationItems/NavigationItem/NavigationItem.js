import React from 'react';
import classes from './NavigationItem.css';
import { Link } from 'react-router-dom';

const navigationItem = (props) => {
    const classNames = [classes.NavigationItem, classes[props.className]].join(' ');
    return (
        <li className={classNames} >
            {
                props.git 
                ? <a href={props.link}> {props.children} </a>
                : <Link to={props.link} > {props.children} </Link>
            }
        </li>
    );
}
    

export default navigationItem;