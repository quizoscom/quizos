import React from 'react';

import classes from './Choices.css';

import Input from '../UI/Input/Input';

const choices = (props) => {
    const classNames = [classes.Choices, classes[props.className]].join(' ');
    let choices = ''
    if(!props.viewer) {
        choices = [1, 2, 3, 4].map(i => {
            return (
                <div key={i}>
                    <Input 
                        inputType="text" 
                        changed={(event) => props.changed(event, i)}
                        value={props.value.length >= i ? props.value[i-1] : ""}
                    />
                    <p className={props.answer === i ? classes.answer : ''} onClick={() => props.clicked(i)}>ca</p>
                </div>
            );
        });
    } else {
        let sno = 1;
        choices = props.choices.map(choice => {
            const classNames = props.selected === choice
                                ? [classes.Choice, classes.selected].join(' ')
                                : classes.Choice;
            return (
                <p key={choice} className={classNames} onClick={() => props.clicked(choice)} >{sno++}) <span>{choice}</span></p>
            );
        });
    }
    return (
        <div className={classNames}>
            {!props.viewer ? <label>Choices</label> : null }
            {choices}
        </div>
    );
}

export default choices;