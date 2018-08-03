import React from 'react';

import classes from './Loader.css';

const loader = (props) => (
    <div className={classes.LoaderCont}>
        <p className={classes.LoadingP}>Loading</p>
        <div className={classes.Parent}>
            <div className={classes.Loader} style={props.loaderStyle}></div>
            <div className={classes.Loader2} style={props.loader2Style}></div>
        </div>
    </div>
);

export default loader;