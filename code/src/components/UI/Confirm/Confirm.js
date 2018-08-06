import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Confirm.css';
import CloseIcon from '../../../assets/close-icon.png';

import Backdrop from '../Backdrop/Backdrop';

import Button from '../Button/Button';

import * as actions from '../../../store/actions/';

class Confirm extends Component {
    closeImageClickedHandler = () => {
        this.props.onHideConfirm();
    }

    childClickedHandler = (event) => {
        event.stopPropagation();
    }

    onOkButtonClickedHandler = () => {
        this.props.onOkClicked(1);
    }

    onCancelButtonClickedHandler = () => {
        this.props.onOkClicked(0);
    }

    render() {
        return this.props.confirmMsg !== ''
            ? (<Backdrop>
                    <div className={classes.Confirm} onClick={this.childClickedHandler}>
                        <img onClick={this.closeImageClickedHandler} src={CloseIcon} alt="Close" />
                        <p>{this.props.confirmMsg}</p>
                        <div className={classes.ButtonGroup}>
                            <Button style={{ backgroundColor: '#ffffff', color: '#000'}} clicked={this.onOkButtonClickedHandler} >OK</Button>
                            <Button style={{ backgroundColor: '#d32f2f', color: '#fff'}} clicked={this.onCancelButtonClickedHandler} >Cancel</Button>
                        </div>
                    </div>
                </Backdrop>)
            : null
    }
}

const mapStateToProps = state => {
    return {
        confirmMsg: state.confirm.confirmMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowConfirm: (confirmMsg) => dispatch(actions.showConfirm(confirmMsg)),
        onHideConfirm: () => dispatch(actions.hideConfirm()),
        onOkClicked: (okClicked) => dispatch(actions.okClicked(okClicked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);