import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const classNames = [classes.Button, classes[props.btnType], classes[props.className]].join(' ');
    return (
        <button style={props.style} className={classNames} onClick={props.clicked !== undefined ? props.clicked : null}>{props.children}</button>
    );
}

export default button;