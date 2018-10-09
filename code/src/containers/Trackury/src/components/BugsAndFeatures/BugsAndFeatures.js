import React from 'react';

import classes from './BugsAndFeatures.css';

import Card from '../Card/Card';
import Title from '../Title/Title';
import ContentCard from '../ContentCard/ContentCard';
import AddButton from '../AddButton/AddButton';
import Aux from '../Auxiliary/Auxiliary';
import Loader from '../Loader/Loader';

const bugs = props => {
    let data = [];
    if(props.type === "bugs") {
        data = props.bugsData
    } else {
        data = props.featuresData
    }
    return (
        <div className={classes.Bugs}>
            <Title style={{color: "#FFFFFF"}}>{props.type === "bugs" ? "Bugs" : "New Features"}</Title>
            <Card style={{backgroundColor: "#FFFFFF", padding: "1em", margin: "1em", alignItems: "flex-start", height: 340}}>
                <Card style={{backgroundColor: "#FFFFFF", flexDirection: "column"}}>
                    <AddButton
                         type={props.type}
                         loading={props.loading}
                         addButtonClicked={props.addButtonClicked}/>
                    {
                        !props.loading
                        ? data !== undefined && data.length !== 0
                            ? data.map((bug, index) => {
                                return !bug.checked
                                    ? (
                                        <Aux key={index}>
                                            <ContentCard
                                                shadow
                                                entryId={bug.id}
                                                type={props.type}
                                                label={bug.title}
                                                votes={bug.votes}
                                                rootIndex={index}
                                                checked={bug.checked}
                                                loading={props.loading}
                                                voterRendered={props.voterRendered}
                                                votesUpClicked={props.votesUpClicked}
                                                checkBoxClicked={props.checkBoxClicked}
                                                style={{width: "90%", padding: "2px 15px", alignItems: "center", flexDirection: "row"}}/>
                                        </Aux>
                                      )
                                    : props.showCompleted
                                        ? (
                                            <Aux key={index}>
                                                <ContentCard
                                                    shadow
                                                    entryId={bug.id}
                                                    type={props.type}
                                                    label={bug.title}
                                                    votes={bug.votes}
                                                    rootIndex={index}
                                                    checked={bug.checked}
                                                    loading={props.loading}
                                                    voterRendered={props.voterRendered}
                                                    votesUpClicked={props.votesUpClicked}
                                                    checkBoxClicked={props.checkBoxClicked}
                                                    style={{width: "90%", padding: "2px 15px", alignItems: "center", flexDirection: "row"}}/>
                                            </Aux>
                                          )
                                        : null
                            })
                            : <p>Add {props.type === "bugs" ? props.type : "feature requests"} here</p>
                        : <Loader />
                    }
                </Card>
            </Card>
        </div>
    )
}

export default bugs;