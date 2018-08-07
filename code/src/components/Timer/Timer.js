import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Timer.css';

import * as actions from '../../store/actions';

class Timer extends Component {
    state = {
        time: ''
    }

    componentDidMount() {
        const timer = this.props.timer * 60;
        let hr = Math.floor(timer / 3600) 
        let mins = Math.floor((timer % 3600) / 60)
        let secs = (timer % 3600) % 60;
        this.updateTimeState(hr, mins, secs);
        this.timerID = setInterval(
            () => {
                const timeArray = this.updateTime(hr, mins, secs);
                hr = timeArray[0];
                mins = timeArray[1];
                secs = timeArray[2];
                this.updateTimeState(hr, mins, secs)
            },
            1000
        );
    }

    componentWillUnmount() {
        this.isStopped = true;
        clearInterval(this.timerID);
    }

    updateTimeState = (hr, mins, secs) => {
        let time = '';
        if(hr === 0) {
            time = this.padWithZero(mins) + ':' + this.padWithZero(secs)
        } else {
            time = this.padWithZero(hr) + ':' + this.padWithZero(mins) + ':' + this.padWithZero(secs);
        }
        this.props.onTimerChange(hr, mins, secs);
        !this.isStopped && this.setState(prevState => ({
            time: time,
            hr: hr,
            mins: mins,
            secs: secs
        }));
    }

    padWithZero = (num) => {
        if(num.toString().length === 1) {
            return "0" + num;
        } else {
            return num;
        }
    }

    updateTime = (hr, mins, secs) => {
        if(hr > 0) {
            if(mins === 0 && secs === 0) {
                hr--;
                mins = 59;
                secs = 59;
            } else {
                if(mins > 0) {
                    if(secs === 0) {
                        mins--;
                        secs = 59;
                    } else {
                        secs--;
                    }
                } else if(mins === 0) {
                    if(secs > 0) {
                        secs--;
                    }
                } else {
                    secs--;
                }
            }
        } else {
            if(mins > 0) {
                if(secs === 0) {
                    mins--;
                    secs = 59;
                } else {
                    secs--
                }
            } else if(mins === 0) {
                if(secs > 0) {
                    secs--;
                }
            }
        }

        if(hr === 0 && mins === 0 && secs === 0) {
            console.log('timer automatically stopped');
            this.props.onCounterComplete();
            clearInterval(this.timerID);
        }
        return [hr, mins, secs];
    }

    render() {
        return (
            <p 
                className={classes.Timer}
                style={ this.props.hr === 0 && this.props.mins === 0 ? {color: '#ffd241'} : null}
            >{this.state.time}</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        hr: state.timer.hr,
        mins: state.timer.mins,
        secs: state.timer.secs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTimerChange: (hr, mins, secs) => dispatch(actions.timerRunning(hr, mins, secs)),
        onTimerStopped: (hr, mins, secs) => dispatch(actions.timerStopped(hr, mins, secs)),
        onCounterComplete: () => dispatch(actions.counterCompleted())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);