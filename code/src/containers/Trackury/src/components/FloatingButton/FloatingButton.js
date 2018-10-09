import React from 'react';
import classes from './FloatingButton.css';

const floatingButton = props => {
    return (
        <div className={classes.toggleCompletedLink} onClick={props.toggleCompletedClicked}>
            <p>{props.showCompleted ? "hide" : "show" } completed</p>
        </div>
    );
}

export default floatingButton;