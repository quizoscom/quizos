import React, { Component } from 'react';

import classes from './Auth.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import FormField from '../../components/FormField/FormField';

class Auth extends Component {
    state = {
        register: true        
    }

    onInputChangedHandler = (event) => {
        console.log(event.target.value);
    }

    onFormSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.register) {
            console.log('register');
        } else {
            console.log('login');
        }
    }

    registerLoginToggleLinkClickHandler = () => {
        this.setState(prevState => ({
            register: !prevState.register
        }))
    }

    render() {
        return (
            <Aux>
                <p className={classes.title}>{this.state.register ? 'Sign Up' : 'Login'}</p>
                <form className={classes.Auth} onSubmit={this.onFormSubmitHandler} >
                    <FormField formFieldType="email" changed={this.onInputChangedHandler} label="Email" />
                    <FormField formFieldType="password" changed={this.onInputChangedHandler} label="Password" />
                    <Button btnType="cta">{this.state.register ? 'Sign Up' : 'Login'}</Button>
                    <p onClick={this.registerLoginToggleLinkClickHandler} className={classes.registerLoginToggleLink}>{this.state.register ? 'Already a user? Login' : 'Not a User? Register'}</p>
                </form>
            </Aux>
        );
    }
}

export default Auth;