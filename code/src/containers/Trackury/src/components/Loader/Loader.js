import React from 'react';

import classes from './Loader.css';

const loader = props => (
    <div className={classes.loaderContainer}>
        <div className={classes.loader}>
            <svg className={classes.circular} viewBox="25 25 50 50">
            <circle className={classes.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
        </div>
    </div>
);

export default loader;