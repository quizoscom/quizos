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

class Score extends Component {
    state = {
        recentScores: [15, 20, 18, 19, 20, 1]
    }

    onShareClickHandler = () => {
        console.log('share click');
    }

    render() {
        let body = <Redirect to="/" />;
        if(this.props.score !== 0 && this.props.noOfQuestions !== 0) {
            const shareDesc = `I got ${this.props.score} in React quiz. Evaluate yourself or others on thousands of language on evaluiz.com`;
            body = (
                <div className={classes.Score}>
                    <p className={classes.ScoreP}><span>Your Score</span> <span>{this.props.score}/{this.props.noOfQuestions}</span></p>
                    <div className={classes.ShareCont}>
                        <p>Share</p>
                        <FacebookShareButton url="evaluiz.com" quote={shareDesc} ><img src={FacebookIcon} alt="Facebook Icon"/></FacebookShareButton>
                        <TwitterShareButton url="evaluiz.com" via="evaluiz" title={shareDesc}><img src={TwitterIcon} alt="Twitter Icon"/></TwitterShareButton>
                        <LinkedinShareButton url="evaluiz.com" description={shareDesc}><img src={LinkedInIcon} alt="LinkedIn Icon"/></LinkedinShareButton>
                        <WhatsappShareButton url="evaluiz.com" title={shareDesc}><img src={WhatsAppIcon} alt="WhatsApp Icon"/></WhatsappShareButton>
                        <EmailShareButton url="evaluiz.com" body={shareDesc} subject="evaluiz.com"><img src={GmailIcon} alt="Gmail Icon"/></EmailShareButton>
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
        return body;
    }
}

export const mapStateToProps = state => {
    return {
        score: state.quiz.score,
        noOfQuestions: state.quiz.noOfQuestions
    }
}

export default connect(mapStateToProps)(Score);