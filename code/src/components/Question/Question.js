import React from 'react';

import classes from './Question.css';

import Input from '../UI/Input/Input';

const question = (props) => (
    <div className={classes.Question}>
        <label>Question</label>
        <Input changed={props.changed} inputType="text" ></Input>
    </div>
);

export default question;