import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import classes from './Backdrop.css';

class Backdrop extends Component {
    backdropClickedHandler = (event) => {
        event.preventDefault();
        this.props.onHideAlert();
        this.props.onHideConfirm();
    }

    render() {
        return (
            <div className={classes.Backdrop} onClick={this.backdropClickedHandler}>
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHideAlert: () => dispatch(actions.hideAlert()),
        onHideConfirm: () => dispatch(actions.hideConfirm())
    }
}

export default connect(null, mapDispatchToProps)(Backdrop);