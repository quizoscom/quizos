import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Alert.css';
import CloseIcon from '../../../assets/close-icon.png';

import Backdrop from '../Backdrop/Backdrop';

import * as actions from '../../../store/actions/';

class Alert extends Component {
    closeImageClickedHandler = () => {
        this.props.onHideAlert();
    }

    childClickedHandler = (event) => {
        event.stopPropagation();
    }

    render() {
        console.log(this.props.alertType)
        const classNames = [classes.Alert, classes[this.props.alertType]].join(' ');
        return !this.props.alertMsg !== ''
            ? (<Backdrop>
                    <div className={classNames} onClick={this.childClickedHandler}>
                        {this.props.alertType !== 'failed' ? <img onClick={this.closeImageClickedHandler} src={CloseIcon} alt="Close" /> : null }
                        <h2>{this.props.alertType}</h2>
                        <p>{this.props.children}</p>
                    </div>
                </Backdrop>)
            : null
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
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
        onHideAlert: () => dispatch(actions.hideAlert()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);