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
                return <option key={index} value={val} >{val.replace(/_/g, ' ')}</option>
            })}
        </select>
    );
}

export default select;
