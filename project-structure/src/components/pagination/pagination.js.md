# Pagination.js

{% hint style="info" %}
functional component
{% endhint %}



### props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| prevButtonClicked | func |  | previous button clicked handler |
| prevButtonDisabled | bool | false | whether to enable or disable previous button base on current page number |
| inputChaned | func |  | input changed handler |
| inputValue | String |  | input value for page number |
| totalPages | Number |  | total number of pages calculated after quizzes has been loaded |
| selectChanged | func |  | total rows to be shown select changed handler |
| paginationRowCount | Number |  | total rows to be shown per page based on option selected in the total rows to be shown select |
| selectOptions | Array |  | options for total rows to be shown select |
| nextButtonClicked | func |  | next button clicked handler |
| nextButtonDisabled | bool | false | whether to enable or disable next button based on current page number |



### code

{% code-tabs %}
{% code-tabs-item title="/src/components/Pagination/Pagination.js" %}
```javascript
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
```
{% endcode-tabs-item %}
{% endcode-tabs %}





