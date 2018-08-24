import React from 'react';
import classes from './PageHeading.css';

const h2 = props => <h2 className={classes.H2}>{props.children}</h2>;

export default h2;