import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Error404.css';

const error404 = () => (
    <div className={classes.Error404}>
        <h1>Sorry, this happened</h1>
        <p>Please try again</p>
        <Link to="/">Home</Link>
    </div>
);

export default error404;