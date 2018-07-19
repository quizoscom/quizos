import React from 'react';
import classes from './Input.css';

const input = (props) => {
    const classNames = [classes.Input, classes[props.className]].join(' ');
    let body = <input 
                    onChange={props.changed} 
                    type={props.inputType} 
                    className={classNames} 
                    />;
    if(props.value) {
        body = <input 
                    onChange={props.changed} 
                    type={props.inputType} 
                    className={classNames} 
                    value=""/>
    }
    return body;
}

export default input;