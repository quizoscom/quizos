import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu'; // https://github.com/negomi/react-burger-menu

import Logo from '../../assets/logo-with-text.png';

import NavigationItem from '../Navigation/NavigationItems/NavigationItem/NavigationItem';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Sidebar.css';

class Sidebar extends Component {
    state = {
        menuOpen: false
    }

    closeMenu = () => {
        this.setState({menuOpen: false})
    }

    render() {
        const style = {
            display: 'block',
            top: '0',
            margin: '1.8em 0',
            textAlign: 'left',
            padding: '0 21px'
        }
        let body = null;
        if(!this.props.isQuizActive) {
            if(this.props.isAuth) {
                body = (
                    <Aux>
                        <NavigationItem clicked={this.closeMenu} style={style} className="onlyMobile" link="/dashboard">Dashboard</NavigationItem>
                        <NavigationItem clicked={this.closeMenu} style={style} className="onlyMobile" link="/create-quiz">Create Quiz</NavigationItem>
                        <NavigationItem clicked={this.closeMenu} style={style} className="onlyMobile" link="/available-quizzes">Take Quiz</NavigationItem>
                        <NavigationItem clicked={this.closeMenu} style={style} className="onlyMobile" link="/logout">Logout</NavigationItem>
                    </Aux>
                );
            } else {
                body = <NavigationItem clicked={this.closeMenu} style={style} className="onlyMobile" link="/auth">Login</NavigationItem>;
            }
        }
        return (
            <Menu 
                isOpen={this.state.menuOpen}
                burgerButtonClassName={classes.burgerButton} 
                menuClassName={classes.Menu} 
                pageWrapId={"page-wrap"} 
                outerContainerId={"outer-container"}
                width={210}
            >
                <Link onClick={this.closeMenu} to="/"><img src={Logo} alt="Evaluiz"/></Link>
                <NavigationItem clicked={this.closeMenu} exact style={style} className="onlyMobile" link="/">Home</NavigationItem>
                {body}
            </Menu>
        );
    }
}

export default Sidebar;