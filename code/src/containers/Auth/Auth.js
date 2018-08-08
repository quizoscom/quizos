import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login'; // https://github.com/anthonyjgrove/react-google-login

import classes from './Auth.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';
import FormField from '../../components/FormField/FormField';
import GoogleLoginImage from '../../assets/google-sign-in-logo.png';

import * as actions from '../../store/actions/';

class Auth extends Component {
    state = {
        register: false,
        email: '',
        password: '',
        forgotPassword: 0
    }

    onInputChangedHandler = (event, type) => {
        const value = event.target.value;
        type === "email"
        ? this.setState(prevState => ({email: value}))
        : this.setState(prevState => ({password: value}))
    }

    onFormSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.email !== '' && this.state.password !== '') {
            this.props.onAuth(this.state.email, this.state.password, this.state.register, 'firebase');
        } else {
            this.props.onAuthFailedAction('EMAIL AND PASSWORD ARE REQUIRED');
        }
    }

    registerLoginToggleLinkClickHandler = () => {
        this.setState(prevState => ({
            register: !prevState.register
        }))
    }

    responseGoogleSuccess = (res) => {
        this.props.onGoogleLogin(res.profileObj.email, res.googleId, res.tokenId, res.tokenObj.expires_in);
    }

    responseGoogleFailed = (err) => {
        this.props.onShowAlert(err, 'warning');
    }

    forgotPasswordClickHandler = () => {
        this.setState(prevState => ({
            forgotPassword: 1
        }));
    }

    render() {
        let body = null;
        if(this.state.forgotPassword) {
            body = <p>Forgot Password</p>
        } else {
            let authRedirect = null;
            if(this.props.isAuth) {
                authRedirect = <Redirect to={this.props.redirectPath} />
            }
            body = (
                <Aux>
                    {authRedirect}
                    <p className={classes.title}>{this.state.register ? 'Sign Up' : 'Login'}</p>
                    <div className={classes.Auth}>
                        <form onSubmit={this.onFormSubmitHandler} >
                            <p className={classes.errorMessage}>{this.props.errorMessage}</p>
                            <FormField 
                                formFieldType="email" 
                                changed={(event) => this.onInputChangedHandler(event, "email")} 
                                label="Email" 
                            />
                            <FormField 
                                formFieldType="password" 
                                changed={(event) => this.onInputChangedHandler(event, "password")} 
                                label="Password" 
                            />
                            <Button btnType="cta">{this.state.register ? 'Sign Up' : 'Login'}</Button>
                        </form>
                        <p className={classes.OR}>OR</p>
                        <GoogleLogin
                            style={{backgroundImage: `URL(${GoogleLoginImage})`}}
                            className={classes.googleLogin}
                            clientId="1006569016085-g688ugm0ei4tp65lsnuask8n09go5ujo.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailed}
                        />
                        <div className={classes.bottomLinks}>
                            <p onClick={this.forgotPasswordClickHandler} className={classes.forgotPasswordLink}>{'Forgot Password'}</p>
                            <p onClick={this.registerLoginToggleLinkClickHandler} className={classes.registerLoginToggleLink}>{this.state.register ? 'Already a user? Login' : 'Not a User? Register'}</p>
                        </div>
                        {
                            this.props.alertMsg !== ''
                            ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                            : null
                        }
                    </div>
                </Aux>
            );
        }
        return body;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.redirectPath,
        alertMsg: state.alert.alertMsg,
        alertType: state.alert.alertType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, register, medium) => dispatch(actions.auth(email, password, register, medium)),
        onAuthFailedAction: (error) => dispatch(actions.authFailedAction(error)),
        onGoogleLogin: (email, userId, token, expiresIn) => dispatch(actions.googleLogin(email, userId, token, expiresIn)),
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);