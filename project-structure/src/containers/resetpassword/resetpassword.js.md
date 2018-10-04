# ResetPassword.js

{% hint style="info" %}
class based component
{% endhint %}



### state

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| medium | String |  | google or firebase |
| password | String |  | store user entered new password |



### functions

| name | params | description |
| :--- | :--- | :--- |
| componentWillUnmount |  | reset resetpassword related states on component unmount |
| resetPasswordSubmitHandler | event | reset password button handler |
| onInputChangedHandler | event | password input changed handler |



### store props

| name | link |
| :--- | :--- |
| loading, errorMessage, isAuth | link to auth reducer |



### store actions

| name  | link |
| :--- | :--- |
| onChangePassword, onChangedPassswordResetStates | link to auth actions |



### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/ResetPassword/ResetPassword.js" %}
```javascript
import React, { Component } from 'react'
import queryString from 'query-string';
import { connect } from 'react-redux';

import classes from './ResetPassword.css';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import InlineLoader from '../../components/UI/InlineLoader/InlineLoader';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions';

class ResetPassword extends Component {
    state = {
        medium: '',
        password: ''
    }

    componentWillUnmount() {
        this.props.onChangedPassswordResetStates();
    }

    resetPasswordSubmitHandler = event => {
        event.preventDefault();
        if(this.state.password !== '') {
            this.props.onChangePassword(this.state.password, this.state.medium, queryString.parse(this.props.location.search).oobCode)
        } else {

        }
    }

    onInputChangedHandler = event => {
        const value = event.target.value;
        this.setState(prevState => ({password: value}))
    }

    render() {
        return (
            <Aux>
                <p className={classes.title}>Reset Password</p>
                <div className={classes.ResetPassword}>
                    <form onSubmit={this.resetPasswordSubmitHandler}>
                        <p className={classes.errorMessage}>{this.props.errorMessage !== null ? this.props.errorMessage.replace(/_/g, " ") : ""}</p>
                        <FormField 
                            formFieldType="password"
                            changed={this.onInputChangedHandler} 
                            label="New Password" 
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
        onChangePassword: (password, medium, oobCode) => dispatch(actions.changePassword(password, medium, oobCode)),
        onChangedPassswordResetStates: () => dispatch(actions.changedPassswordResetStates())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

