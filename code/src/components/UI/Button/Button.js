import React from 'react';
import classes from './Button.css';

const button = (props) => {
    console.log(props.disabled)
    const disabled = props.disabled === true ? "disabled" : null
    const classNames = [classes.Button, classes[props.btnType], classes[props.className]].join(' ');
    return (
        <button 
            style={props.style} 
            className={classNames} 
            onClick={props.clicked !== undefined ? props.clicked : null}
            disabled={disabled}
        >{props.children}</button>
    );
}

export default button;