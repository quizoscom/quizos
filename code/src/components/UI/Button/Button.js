import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const classNames = [classes.Button, classes[props.btnType], classes[props.className]].join(' ');
    return (
        <button className={classNames} onClick={props.clicked}>{props.children}</button>
    );
}

export default button;