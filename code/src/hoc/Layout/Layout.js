import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Toolbar/Toolbar';

import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;