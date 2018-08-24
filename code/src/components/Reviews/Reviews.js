import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import axios from 'axios';
import qs from 'qs';

import Button from '../../components/UI/Button/Button';
import InlineLoader from '../../components/UI/InlineLoader/InlineLoader';
import Alert from '../../components/UI/Alert/Alert';

import classes from './Reviews.css';

import { SERVER_ROOT_URL } from '../../shared/serverLinks';
import { SERVER_ERROR_MSG } from '../../shared/alertMessages';
import * as actions from '../../store/actions/';

class Reviews extends Component {
    state = {
        olderRating: 0,
        olderReview: ''
    }

    componentDidMount() {
        axios.post(`${SERVER_ROOT_URL}/get/get-indiv-rating.php`, qs.stringify({
            quizId: this.props.quizId,
            usersId: this.props.userId
        }))
        .then(res => {
            if(res.data.status === 'success') {
                if(res.data.msg === 'rated') {
                    this.setState(prevState => ({
                        olderRating: res.data.rating,
                        olderReview: res.data.review
                    }));
                } else {
                    this.setState(prevState => ({
                        olderRating: 0,
                        olderReview: ''
                    }));
                }
            }
        }).catch(err => {
            this.props.onShowAlert(SERVER_ERROR_MSG, 'failed');
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.error !== null && nextProps.error !== '') {
            nextProps.onShowAlert(nextProps.error, 'failed');
        }
        return true;
    }

    componentWillUnmount() {
        this.props.onResetRatingsAndReviewStates();
    }

    ratingChangedHandler = (value) => {
        this.rating = value;
    }

    reviewChangedHandler = (event) => {
        this.review = event.target.value;
    }

    reviewSaveHandler = (event) => {
        event.preventDefault();
        this.props.onSaveRatingAndReview(this.rating, this.review, this.props.userId, this.props.quizId);
        this.setState({
            olderRating: 0,
            olderReview: ''
        })
    }

    render() {
        let body = null;
        if(this.props.reviewGiven) {
            body = <p className={classes.Thanks}>Huge thanks for the feedback, It helps us to improve our platform.</p>
        } else {
            body = (
                <div className={classes.Rating}>
                    {
                        this.state.olderRating !== 0 || this.state.olderReview !== ''
                        ? (
                            <div className={classes.OlderRatingReviews}>
                                <p className={classes.Title}>Your Earlier Ratings</p>
                                <p className={classes.OlderRating}>Rating: {this.state.olderRating} / 5</p>
                                <p className={classes.OlderReview}>Review: {this.state.olderReview}</p>
                            </div>
                        )
                        : null
                    }
                    <form onSubmit={this.reviewSaveHandler}>
                        <p>Let us know what do you think about the Quiz? </p>
                        <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            fractions={2}
                            onChange={this.ratingChangedHandler}
                        />
                        <textarea onChange={this.reviewChangedHandler} placeholder="Write your Review here..."></textarea>
                        {
                            this.props.loading === true
                            ? <InlineLoader />
                            : <Button style={{backgroundColor: '#311b92', color: '#fff'}}>Save</Button>
                        }
                    </form>
                    {
                        this.props.error !== '' && this.props.error != null
                        ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                        : null
                    }
                </div>
            );
        }
        return body;
    }
}

const mapStateToProps = state => {
    return {
        rating: state.rating.rating,
        review: state.rating.review,
        loading: state.rating.loading,
        error: state.rating.error,
        reviewGiven: state.rating.reviewGiven,
        alertType: state.alert.alertType,
        alertMsg: state.alert.alertMsg,
        userId: state.auth.userId,
        quizId: state.quiz.quizId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveRatingAndReview: (rating, review, usersId, quizId) => dispatch(actions.saveRatingAndReview(rating, review, usersId, quizId)),
        onResetRatingsAndReviewStates: () => dispatch(actions.resetRatingsAndReviewStates()),
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
        onHideAlert: () => dispatch(actions.hideAlert()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);