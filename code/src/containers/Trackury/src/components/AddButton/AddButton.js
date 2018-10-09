import React from 'react';

import classes from './AddButton.css';
import AddImg from '../../../assets/add.png';

const addButton = props => {
    return (
        <div className={!props.loading ? classes.AddButton : classes.AddButtonDisabled} onClick={!props.loading ? () => props.addButtonClicked(props.type) : null}>
            <img src={AddImg} alt="Add"/>
            <p>Add</p>
        </div>
    );
}

export default addButton;