import React from 'react';

import classes from './Question.css';

import Input from '../UI/Input/Input';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const question = (props) => {
    let body = '';
    const classNames = [classes.Question, classes[props.className]].join(' ')
    if(!props.viewer) {
        body = (
            <Aux>
                <label>Question</label>
                <Input 
                    changed={props.changed} 
                    inputType="text"
                    value={props.value}
                ></Input>
            </Aux>
        )
    } else {
        body = <p className={classes.questionTitle}>{props.title}</p>
    }
    return (
        <div className={classNames}>
            {body}
        </div>
    );
}

export default question;