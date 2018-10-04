import React from 'react';

import classes from './Pagination.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const pagination = props => {
    let selectValue = props.paginationRowCount;
    return (
        <div className={classes.Pagination}>
            <Button 
                clicked={props.prevButtonClicked} 
                disabled={props.prevButtonDisabled}
            >Previous</Button>
            <div>
                <p style={{
                    backgroundColor: '#fff !important'
                }}>Page</p>
                <Input
                    changed={props.inputChanged}
                    inputType="number"
                    value={props.inputValue}
                />
                <p>of {props.totalPages}</p>
                <select 
                    className="PaginationSelect"
                    onChange={props.selectChanged}
                    value={selectValue}
                >
                    {props.selectOptions.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
            <Button 
                clicked={props.nextButtonClicked} 
                disabled={props.nextButtonDisabled}
            >Next</Button>
        </div>
    );
}

export default pagination;