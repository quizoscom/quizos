import React from 'react';

import classes from './Card.css';

const card = props => {
    const style = props.style !== undefined ? {
            backgroundColor: props.style.backgroundColor ? props.style.backgroundColor : "#F5F5F5", 
            borderRadius: props.style.borderRadius ? props.style.borderRadius : 4,
            boxShadow: props.shadow ? "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)" : null,
            padding: props.style.padding ? props.style.padding : null,
            display: props.style.display ? props.style.display : "flex",
            flexGrow: props.style.flexGrow ? props.style.flexGrow : null,
            flexDirection: props.style.flexDirection ? props.style.flexDirection : null,
            margin: props.style.margin ? props.style.margin : 0,
            width: props.style.width ? props.style.width : null,
            height: props.style.height ? props.style.height : null,
            alignItems: props.style.alignItems ? props.style.alignItems : null,
            justifyContent: props.style.justifyContent ? props.style.justifyContent : null,
            overflow: props.style.overflow ? props.style.overflow : null
        } : {
            backgroundColor: "#F5F5F5",
            borderRadius: 4,
            boxShadow: null,
            display: "flex",
            margin: 0
        }

    return (
        <div
            className={classes.Card}
            style={style}
        >
            {props.children}
        </div>
    );
}

export default card;