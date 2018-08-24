import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Features.css';

import Button from '../../components/UI/Button/Button';

import TeacherIcon from '../../assets/teacher-icon.png';
import StudentIcon from '../../assets/student-icon.png';
import TickIcon from '../../assets/tick-icon.png';
import NewUserMessageBackgroundImg from '../../assets/new-user-background.jpg';
import SmileyImg from '../../assets/smiley.png';

import * as actions from '../../store/actions/';

class NewUser extends Component {
    state = {
        creatingQuiz: {
            features: [
                "Complete Open Source i.e. always FREE<span>*</span> to use",
                "Built by Community on Github.com",
                "Completely Mobile Friendly",
                "Create quiz easily for interview, assessment, or just for fun",
                "Add Timer upto 180 minutes",
                "Share your Quiz Link via Email or any social media in one click"
            ],
            image: TeacherIcon
        },
        takingQuiz: {
            features: [
                "Take Quiz Anytime on Desktop or Mobile Completely FREE",
                "Get Your Quiz Score Instantly",
                "Prepare for interview, assessment or just evaluate yourself",
                "Choose between thousands of quizzes created by users all around the world",
                "Share your Quiz Result via Email or any social media in one click",
                "See Rating and Reviews from other users before taking a Quiz"
            ],
            image: StudentIcon
        },
        redirectPath: ''
    }

    componentDidMount() {
        this.props.onSetRedirectPath("/");
    }

    createQuizButtonClickedHandler = () => {
        if(this.props.isAuth) {
            this.setState(prevState => ({
                redirectPath: "/create-quiz"
            }));
        } else {
            this.props.onSetRedirectPath("/create-quiz");
            this.setState(prevState => ({
                redirectPath: "/auth"
            }));
        }
    }

    takeQuizButtonClickedHandler = () => {
        if(this.props.isAuth) {
            this.setState(prevState => ({
                redirectPath: "/available-quizzes"
            }));
        } else {
            this.props.onSetRedirectPath("/available-quizzes");
            this.setState(prevState => ({
                redirectPath: "/auth"
            }));
        }
    }

    render() {
        let body = <Redirect to={this.state.redirectPath} />
        if(this.state.redirectPath === '') {
            let newUserBody = null;
            if(window.location.pathname === '/dashboard') {
                newUserBody = (
                    <div className={classes.NewUserWelcome} style={{backgroundImage: `url(${NewUserMessageBackgroundImg})`}}>
                        <img src={SmileyImg} alt="Welcome" />
                        <p>We are too excited to see your first quiz</p>
                    </div>
                );
            }
            body = (
                <div className={classes.NewUser}>
                    {newUserBody}
                    <p className={classes.Title}>Features</p>
                    <div className={classes.CardCont}>
                        <div>
                            <div className={classes.CreateQuiz}>
                                <p className={classes.Title}>Creating Quiz</p>
                                <ul className={classes.Features}>
                                    {this.state.creatingQuiz.features.map(feature => {
                                        return <li key={feature}> <img src={TickIcon} alt="Tick Icon" /> {feature}</li>
                                    })}
                                </ul>
                                <div className={classes.ButtonImgGroup}>
                                    <div>
                                        <Button style={{backgroundColor: '#57528a'}} clicked={this.createQuizButtonClickedHandler}>Create Quiz</Button>
                                    </div>
                                    <div>
                                        <img src={this.state.creatingQuiz.image} alt="Create Quiz"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={classes.TakeQuiz}>
                                <p className={classes.Title}>Taking Quiz</p>
                                <ul className={classes.Features}>
                                    {this.state.takingQuiz.features.map(feature => {
                                        return <li key={feature}> <img src={TickIcon} alt="Tick Icon" /> {feature}</li>
                                    })}
                                </ul>
                                <div className={classes.ButtonImgGroup}>
                                    <div>
                                        <Button style={{backgroundColor: '#4c929a'}} clicked={this.takeQuizButtonClickedHandler}>Take Quiz</Button>
                                    </div>
                                    <div>
                                        <img src={this.state.takingQuiz.image} alt="Create Quiz"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={classes.StarUl}>
                        <li>* Evaluiz is always FREE to use if you host it on your own or 3rd Party server.</li>
                        <li>* If you are using it on our server, through www.evaluiz.com, You need to talk to us when you crosses 2000 MAU (Monthly Active Users)</li>
                    </ul>
                </div>
            );
        }
        return body;
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetRedirectPath: (path) => dispatch(actions.redirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);