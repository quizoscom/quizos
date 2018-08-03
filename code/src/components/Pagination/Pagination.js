import React from 'react';

import classes from './Pagination.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

const pagination = (props) => {
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
                    <Select 
                        changed={props.selectChanged}
                        value={props.paginationRowCount}
                        options={props.selectOptions}
                    />
                </div>
                <Button 
                    clicked={props.nextButtonClicked} 
                    disabled={props.nextButtonDisabled}
                >Next</Button>
            </div>
        );
}

export default pagination;