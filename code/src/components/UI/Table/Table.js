import React from 'react';
import classes from './Table.css';

const table = (props) => {
    let headerArr = [];
    for(let i = 0; i < 1; i++) {
        headerArr = Object.keys(props.content[i]);
    }
    const head = headerArr.map(head => {
        return head === 'id' ? <th key="sno">S.No.</th> : <th key={head}>{head}</th>
    });
    
    const tbody = props.content.map(row => {
        return (
            <tr key={row['id']}>
                {Object.keys(row).map(col => {
                    return <td key={col.replace('qc-', '').replace('qt-', '')}>{row[col].replace('qc-', '').replace('qt-', '')}</td>
                })}
            </tr>
        );
    });
    return (
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
    );
};

export default table;