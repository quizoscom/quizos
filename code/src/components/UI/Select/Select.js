import React from 'react';
import classes from './Select.css';

const select = (props) => {
    return (
        <select 
            onChange={props.changed} 
            value={props.value}
            className={classes.Select}
        >
            {props.options.map((val, index) => {
                return val === "select"
                ? <option key={index} value={val} disabled>Select</option>
                : <option key={index} value={val} >{val}</option>
            })}
        </select>
    );
}

export default select;