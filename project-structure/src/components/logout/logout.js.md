# LogOut.js

{% hint style="info" %}
class based component
{% endhint %}

### 

### store actions

| name | link |
| :--- | :--- |
| onLogOut | link to auth action |



### functions

| name | description |
| :--- | :--- |
| componentDidMount | call onLogOut action from auth actions |



### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/LogOut/LogOut.js)

{% code-tabs %}
{% code-tabs-item title="/src/components/LogOut/LogOut.js" %}
```javascript
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class LogOut extends Component {
    componentDidMount() {
        this.props.onLogOut();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);

```
{% endcode-tabs-item %}
{% endcode-tabs %}

