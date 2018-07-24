import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import classes from './Auth.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import FormField from '../../components/FormField/FormField';
import GoogleLoginImage from '../../assets/google-sign-in-logo.png';

import * as actions from '../../store/actions/';

class Auth extends Component {
    state = {
        register: false,
        email: '',
        password: ''
    }

    onInputChangedHandler = (event, type) => {
        const value = event.target.value;
        type === "email"
        ? this.setState(prevState => ({email: value}))
        : this.setState(prevState => ({password: value}))
    }

    onFormSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, this.state.register);
    }

    registerLoginToggleLinkClickHandler = () => {
        this.setState(prevState => ({
            register: !prevState.register
        }))
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        let authRedirect = null;
        if(this.props.isAuth) {
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        return (
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
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                    <p onClick={this.registerLoginToggleLinkClickHandler} className={classes.registerLoginToggleLink}>{this.state.register ? 'Already a user? Login' : 'Not a User? Register'}</p>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, register) => dispatch(actions.auth(email, password, register))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);