import React from 'react';

import classes from './Loader.css';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const loader = () => (
    <Aux>
        <p className={classes.LoadingP}>Loading</p>
        <div className={classes.Parent}>
            <div className={classes.Loader}></div>
            <div className={classes.Loader2}></div>
        </div>
    </Aux>
);

export default loader;