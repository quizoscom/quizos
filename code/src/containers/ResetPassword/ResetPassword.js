import React, { Component } from 'react'
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';

import classes from './ResetPassword.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import InlineLoader from '../../components/UI/InlineLoader/InlineLoader';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions';

class ResetPassword extends Component {
    state = {
        email: '',
        medium: '',
        password: ''
    }

    componentDidMount() {
        axios.post('http://localhost/evaluiz/get/get-email.php', qs.stringify({uid: this.props.match.params.uid}))
        .then(res => {
            if(res.data.status === 'success') {
                this.setState(prevState => ({
                    email: res.data.email,
                    medium: res.data.medium
                }));
            } else {
                alert('server error');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    resetPasswordSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.password !== '') {
            this.props.onChangePassword(this.state.email, this.state.password, this.state.medium)
        } else {

        }
    }

    onInputChangedHandler = (event) => {
        const value = event.target.value;
        this.setState(prevState => ({password: value}))
    }

    render() {
        return (
            <Aux>
                <p className={classes.title}>Reset Password</p>
                <div className={classes.ResetPassword}>
                    <form onSubmit={this.resetPasswordSubmitHandler}>
                        <p className={classes.errorMessage}>{this.props.errorMessage}</p>
                        <FormField 
                            formFieldType="password"
                            changed={this.onInputChangedHandler} 
                            label="New  Password" 
                        />
                        {
                            this.props.loading === true
                            ? <InlineLoader style={{color: '#000'}} />
                            : <Button btnType="cta">Change Password</Button>
                        }
                    </form>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errorMessage: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (email, password, medium) => dispatch(actions.changePassword(email, password, medium))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);