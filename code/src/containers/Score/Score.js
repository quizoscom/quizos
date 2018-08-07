import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share'; //https://github.com/nygardk/react-share

import classes from './Score.css';
import FacebookIcon from '../../assets/facebook-icon.png';
import TwitterIcon from '../../assets/twitter-icon.png';
import LinkedInIcon from '../../assets/linkedin-icon.png';
import WhatsAppIcon from '../../assets/whatsapp-icon.png';
import GmailIcon from '../../assets/gmail-icon.png';

import Loader from '../../components/UI/Loader/Loader';

import * as actions from '../../store/actions';

class Score extends Component {
    state = {
        recentScores: [15, 20, 18, 19, 20, 1]
    }

    onShareClickHandler = () => {
        console.log('share click');
    }

    componentDidMount() {
        console.log('score.js');
        this.props.onLoad();
    }

    render() {
        console.log(this.props.loading);
        let body = <Loader />;
        if(!this.props.loading) {
            body = <Redirect to="/" />;
            if(this.props.score !== '' && this.props.noOfQuestions !== 0) {
                const shareDesc = `I got ${this.props.score} in React quiz. Evaluate yourself or others on thousands of language on evaluiz.com`;
                const url = "evaluiz.com";
                body = (
                    <div className={classes.Score}>
                        <p className={classes.ScoreP}><span>Your Score</span> <span>{this.props.score}/{this.props.noOfQuestions}</span></p>
                        <div className={classes.ShareCont}>
                            <p>Share</p>
                            <FacebookShareButton url={url} quote={shareDesc} ><img src={FacebookIcon} alt="Facebook Icon"/></FacebookShareButton>
                            <TwitterShareButton url={url} via="evaluiz" title={shareDesc}><img src={TwitterIcon} alt="Twitter Icon"/></TwitterShareButton>
                            <LinkedinShareButton url={url} description={shareDesc}><img src={LinkedInIcon} alt="LinkedIn Icon"/></LinkedinShareButton>
                            <WhatsappShareButton url={url} title={shareDesc}><img src={WhatsAppIcon} alt="WhatsApp Icon"/></WhatsappShareButton>
                            <EmailShareButton url={url} body={shareDesc} subject="evaluiz.com"><img src={GmailIcon} alt="Gmail Icon"/></EmailShareButton>
                        </div>
                        <div className={classes.RecentScores}>
                            <p>Recent Scores for this quiz</p>
                            {this.state.recentScores.map((score, index) => {
                                return <p key={index}>{score}/{this.props.noOfQuestions}</p>
                            })}
                        </div>
                        <hr className={classes.hr}/>
                    </div>
                );
            }
        }
        return body;
    }
}

export const mapStateToProps = state => {
    return {
        score: state.quiz.score,
        noOfQuestions: state.quiz.noOfQuestions,
        quizId: state.quiz.quizId,
        loading: state.quiz.loading
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(actions.resetRedirectPathFromScore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);