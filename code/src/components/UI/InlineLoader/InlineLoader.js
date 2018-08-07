import React from 'react';

import classes from './InlineLoader.css';

const inlineLoader = () => (
    <div className={classes.InlineLoader}>
        <p>Loading...</p>
        <div className={classes.Loader}></div>
    </div>
);

export default inlineLoader;