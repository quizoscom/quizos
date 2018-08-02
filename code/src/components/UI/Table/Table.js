import React from 'react';
import classes from './Table.css';

import Pagination from '../../../components/Pagination/Pagination';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const table = (props) => {
    let headerArr = [];
    for(let i = 0; i < 1; i++) {
        headerArr = Object.keys(props.content[i]);
    }
    const head = headerArr.map(head => {
        return head === 'id' ? null : <th key={head}>{head.replace(/_/g, ' ')}</th>
    });
    
    const tbody = props.content.map((row) => {
        return (
            <tr key={row['id']}>
                {Object.keys(row).map(col => {
                    if(col === 'id') {
                        return null
                    } else {
                        return <td key={col}>{row[col]}</td>
                    }
                })}
            </tr>
        );
    });
    return (
        <Aux>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {head}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
            {
                props.pagination === "true"
                ? (
                    <Pagination 
                        paginationRowCount={props.paginationRowCount}
                        selectChanged={props.selectChanged}
                        inputChanged={props.inputChanged}
                        totalPages={props.totalPages}
                        selectOptions={props.selectOptions}
                        inputValue={props.inputValue}
                        prevButtonDisabled={props.prevButtonDisabled}
                        nextButtonDisabled={props.nextButtonDisabled}
                    />
                )
                : null
            }
        </Aux>
    );
};

export default table;