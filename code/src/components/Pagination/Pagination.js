import React, { Component } from 'react';

import classes from './Pagination.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

class Pagination extends Component {
    state = {
        curPageNumber: 1
    }

    previousButtonClickedHandler = () => {
        console.log('previous clicked');
    }

    nextButtonClickedHandler = () => {
        console.log('next clicked');
    }

    pageNumberChangedHandler = (event) => {
        const value = event.target.value;
        this.setState(prevState => ({
            curPageNumber: value
        }));
    }

    render() {
        // console.log(this.props.prevButtonDisabled)
        // console.log(this.props.nextButtonDisabled)
        return (
            <div className={classes.Pagination}>
                <Button clicked={this.previousButtonClickedHandler} disabled={this.props.prevButtonDisabled}>Previous</Button>
                <div>
                    <p style={{
                        backgroundColor: '#fff !important'
                    }}>Page</p>
                    <Input
                        changed={this.props.inputChanged}
                        inputType="number"
                        value={this.props.inputValue}
                    />
                    <p>of {this.props.totalPages}</p>
                    <Select 
                        changed={this.props.selectChanged}
                        value={this.props.paginationRowCount}
                        options={this.props.selectOptions}
                    />
                </div>
                <Button clicked={this.nextButtonClickedHandler} disabled={this.props.nextButtonDisabled}>Next</Button>
            </div>
        );
    }
}

export default Pagination;