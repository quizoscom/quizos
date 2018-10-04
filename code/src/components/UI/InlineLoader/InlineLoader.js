import React from 'react';

import classes from './InlineLoader.css';

const inlineLoader = props => (
    <div className={classes.InlineLoader} style={props.style}>
        <p>Loading...</p>
        <div className={classes.Loader}></div>
    </div>
);

export default inlineLoader;