import React from 'react';

import classes from './Checkbox.css';
import CheckImg from '../../../assets/check.png';

const checkbox = props => {
    return (
        <div 
            className={!props.loading ? classes.Checkbox : classes.CheckboxDisabled}
            onClick={!props.loading ? () => props.checkBoxClicked(props.type, props.rootIndex, props.childIndex, props.entryId) : null} 
            style={ props.checked ? {border: "0"} : null}>
            {props.checked ? <img src={CheckImg} alt="Check" /> : null }
        </div>
    );
}

export default checkbox;