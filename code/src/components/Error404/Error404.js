import React from 'react';
import { Link } from 'react-router-dom';

import BackgroundImage from '../../assets/404-background.png';

import classes from './Error404.css';

const error404 = () => {
    const windowHeight = window.innerHeight - 70;
    return (
        <div className={classes.Error404} style={{backgroundImage: `url(${BackgroundImage})`, height: windowHeight}}>
            <div>
                <h1>404</h1>
                <p className={classes.oops}>oops</p>
            </div>
            <p>The page you're looking for is not here</p>
            <p className={classes.ReCheck}>Re-check and try again from</p>
            <Link to="/" className={classes.Link}>Home</Link>
        </div>
    );
}

export default error404;