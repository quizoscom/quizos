import React from 'react';

import Card from '../Card/Card';
import Title from '../Title/Title';
import Checkbox from '../Checkbox/Checkbox';
import Voter from '../Voter/Voter';

const contentCard = props => {
    const style = props.style !== undefined ? {
        backgroundColor: props.style.backgroundColor ? props.style.backgroundColor : "#F5F5F5", 
        borderRadius: props.style.borderRadius ? props.style.borderRadius : 4,
        boxShadow: props.shadow ? "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)" : null,
        padding: props.style.padding ? props.style.padding : null,
        display: props.style.display ? props.style.display : "flex",
        flexGrow: props.style.flexGrow ? props.style.flexGrow : null,
        flexDirection: props.style.flexDirection ? props.style.flexDirection : null,
        width: props.style.width ? props.style.width : null,
        alignItems: props.style.alignItems ? props.style.alignItems : null,
        margin: props.style.margin ? props.style.margin : "10px 0px"
    } : {
        backgroundColor: "#F5F5F5",
        borderRadius: 4,
        boxShadow: null,
        padding: null,
        display: "flex",
        margin: "10px 0px"
    }

    return (
        <Card shadow={props.shadow} style={style} key={props.key}>
            <div>
                <Checkbox
                    type={props.type} 
                    checked={props.checked}
                    entryId={props.entryId}
                    loading={props.loading}
                    rootIndex={props.rootIndex}
                    childIndex={props.childIndex}
                    checkBoxClicked={props.checkBoxClicked}/>
            </div>
            <Title
                type={props.type}
                loading={props.loading}
                entryId={props.entryId}
                rootIndex={props.rootIndex}
                childIndex={props.childIndex}
                checkBoxClicked={props.checkBoxClicked} 
                style={props.checked ? {textDecoration: "line-through", cursor: "pointer", color: "#AEAEAE"} : {cursor: "pointer"}}>
                    {props.label}
            </Title>
            <div>
                <Voter
                    type={props.type}
                    votes={props.votes}
                    voted={props.voted}
                    loading={props.loading}
                    entryId={props.entryId}
                    rootIndex={props.rootIndex}
                    childIndex={props.childIndex}
                    voterRendered={props.voterRendered}
                    votesUpClicked={props.votesUpClicked}/>
            </div>
        </Card>
    );
}

export default contentCard;