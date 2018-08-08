import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import classes from './Backdrop.css';

class Backdrop extends Component {
    backdropClickedHandler = (event) => {
        event.preventDefault();
        if(this.props.alertType !== 'failed') {
            this.props.onHideAlert();
            this.props.onHideConfirm();
        }
    }

    render() {
        return (
            <div className={classes.Backdrop} onClick={this.backdropClickedHandler}>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        alertMsg: state.alert.alertMsg,
        alertType: state.alert.alertType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHideAlert: () => dispatch(actions.hideAlert()),
        onHideConfirm: () => dispatch(actions.hideConfirm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);