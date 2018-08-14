import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import axios from 'axios';
import qs from 'qs';

import Button from '../../components/UI/Button/Button';

import classes from './Reviews.css';

import * as actions from '../../store/actions/';

class Reviews extends Component {
    state = {
        olderRating: 0,
        olderReview: ''
    }
    componentDidMount() {
        axios.post('http://localhost/evaluiz/get/get-indiv-rating.php', qs.stringify({
            quizId: 'c6845e0827af42ae',
            usersId: 'OjJOLcKtuTb01xqyILUGTTPNEXt2'
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
                        olderRating: '',
                        olderReview: ''
                    }));
                }
            }
        }).catch(err => {
            console.log(err)
        });
    }

    ratingChangedHandler = (value) => {
        this.rating = value;
    }

    reviewChangedHandler = (event) => {
        this.review = event.target.value;
    }

    reviewSaveHandler = (event) => {
        event.preventDefault();
        this.props.onSaveRatingAndReview(this.rating, this.review, 'OjJOLcKtuTb01xqyILUGTTPNEXt2', 'c6845e0827af42ae');
    }

    render() {
        return (
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
                    <Button style={{backgroundColor: '#311b92', color: '#fff'}}>Save</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rating: state.rating.rating,
        review: state.rating.review
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveRatingAndReview: (rating, review, usersId, quizId) => dispatch(actions.saveRatingAndReview(rating, review, usersId, quizId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);