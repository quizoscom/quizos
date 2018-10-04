# Score.js

{% hint style="info" %}
class based component
{% endhint %}



### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| recentScores | Array | \[ \] | keeps recent scores for the quiz |
| removeInlineLoader | bool | false | a flag variable to remove inlineloader if recentScores for a quiz array is empty |



### functions

| name | params | description |
| :--- | :--- | :--- |
| componentDidMount |  | get recent scores for the quiz |



### store props

| name | link |
| :--- | :--- |
| score, noOfQuestions, quizId, loading | link to quiz reducer |



### store actions

| name | link |
| :--- | :--- |
| onLoad | link to quiz actions |



### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/Score/Score.js" %}
```javascript
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share'; //https://github.com/nygardk/react-share

import classes from './Score.css';
import FacebookIcon from '../../assets/facebook-icon.png';
import TwitterIcon from '../../assets/twitter-icon.png';
import LinkedInIcon from '../../assets/linkedin-icon.png';
import WhatsAppIcon from '../../assets/whatsapp-icon.png';
import GmailIcon from '../../assets/gmail-icon.png';

import Reviews from '../../components/Reviews/Reviews';
import Loader from '../../components/UI/Loader/Loader';
import InlineLoader from '../../components/UI/InlineLoader/InlineLoader';

import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import * as actions from '../../store/actions';

class Score extends Component {
    state = {
        recentScores: [],
        removeInlineLoader: false
    }

    componentDidMount() {
        this.props.onLoad();
        axios.post(`${SERVER_ROOT_URL}/get/get-recent-scores.php`, qs.stringify({
            quizId: this.props.quizId
        }))
        .then(res => {
            if(typeof res.data.recent_scores !== "undefined") {
                this.setState(prevState => ({
                    recentScores: res.data.recent_scores
                }));
            } else {
                this.setState(prevState => ({
                    removeInlineLoader: true
                }));
            }
        })
        .catch(err => {

        });
    }

    render() {
        let recentScores = <InlineLoader />;
        if(this.state.recentScores.length !== 0 && !this.state.removeInlineLoader) {
            recentScores = (
                <div className={classes.RecentScores}>
                    <p>Recent Scores for this quiz</p>
                    {this.state.recentScores.map((score, index) => {
                        return <p key={index}>{score}/{this.props.noOfQuestions}</p>
                    })}
                </div>
            );
        } else if(this.state.removeInlineLoader) {
            recentScores = null;
        }

        let body = <Loader />;
        if(!this.props.loading) {
            body = <Redirect to="/" />;
            if(this.props.score !== '' && this.props.noOfQuestions !== 0) {
                const scorePercentage = parseFloat(parseInt(this.props.score, 10) / parseInt(this.props.noOfQuestions, 10)).toFixed(2) * 100;
                const shareDesc = `I got ${scorePercentage}% in React quiz. Evaluate yourself or others on thousands of languages on evaluiz.com`;
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
                        <Reviews />
                        {recentScores}
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
```
{% endcode-tabs-item %}
{% endcode-tabs %}

