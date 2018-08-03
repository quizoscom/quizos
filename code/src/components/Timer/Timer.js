import React, { Component } from 'react';

import classes from './Timer.css';

class Timer extends Component {
    state = {
        time: '',
        hr: 0,
        mins: 0,
        secs: 0
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
        console.log('counter complete');
        clearInterval(this.timerID);
    }

    updateTimeState = (hr, mins, secs) => {
        let time = '';
        if(hr === 0) {
            time = this.padWithZero(mins) + ':' + this.padWithZero(secs)
        } else {
            time = this.padWithZero(hr) + ':' + this.padWithZero(mins) + ':' + this.padWithZero(secs);
        }
        this.setState(prevState => ({
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
                    console.log('called');
                    secs--
                }
            } else if(mins === 0) {
                if(secs > 0) {
                    secs--;
                }
            }
        }

        if(hr === 0 && mins === 0 && secs === 0) {
            console.log('counter complete');
            clearInterval(this.timerID);
        }

        console.log(hr, mins, secs);
        return [hr, mins, secs];
    }

    render() {
        return (
            <p 
                className={classes.Timer}
                style={ this.state.hr === 0 && this.state.mins === 0 ? {color: '#ffd241'} : null}
            >{this.state.time}</p>
        );
    }
}

export default Timer;