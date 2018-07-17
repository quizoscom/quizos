import React from 'react';

import classes from './Choices.css';

import Input from '../UI/Input/Input';

const choices = (props) => {
    const choices = [1, 2, 3, 4].map(i => {
        return (
            <div key={i}>
                <Input inputType="text" changed={props.changed} />
                <p className={props.answer === i ? classes.answer : ''} onClick={() => props.clicked(i)}>ca</p>
            </div>
        );
    });
    return (
        <div className={classes.Choices}>
            <label>Choices</label>
            {choices}
        </div>
    );
}

export default choices;