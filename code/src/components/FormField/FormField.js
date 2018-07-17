import React from 'react';

import classes from './FormField.css';
import Input from '../UI/Input/Input';

const formField = (props) => (
    <div className={classes.FormField}>
        <label>{props.label}</label>
        <Input inputType={props.formFieldType} changed={props.changed}/>
    </div>
);

export default formField