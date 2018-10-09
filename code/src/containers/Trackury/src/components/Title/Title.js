import React from 'react';

import classes from './Title.css';

const title = props => {
    return (
        <div
            className={classes.Title}
            onClick={!props.loading ? () => props.checkBoxClicked(props.type, props.rootIndex, props.childIndex, props.entryId) : null}>
            <p
                className={classes.Title}
                style={ props.style !== undefined && props.style !== null ? {
                    color: props.style.color ? props.style.color : "#000000",
                    fontSize: props.style.fontSize ? props.style.fontSize : 17,
                    textAlign: props.style.textAlign ? props.style.textAlign : "left",
                    flexGrow: props.style.flexGrow ? props.style.flexGrow : null,
                    textDecoration: props.style.textDecoration ? props.style.textDecoration : null,
                    cursor: !props.loading ? props.style.cursor ? props.style.cursor : null : "no-drop",
                    textTransform: props.style.textTransform ? props.style.textTransform : null
                } : {
                    color: "#000000",
                    fontSize: 17,
                    textAlign: "left"
                }}
            >
                {props.children}
            </p>
        </div>
    )
}

export default title;