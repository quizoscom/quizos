import React from 'react';

import classes from './Roadmap.css';

import Card from '../Card/Card';
import Title from '../Title/Title';
import Loader from '../Loader/Loader';
import ContentCard from '../ContentCard/ContentCard';
import Aux from '../Auxiliary/Auxiliary';

import { TaskCompleteImg, EmptyBoxImg } from '../../../assets/image';

const roadmap = props => {
    let padding = "";
    let margin = "";
    let flexDirection = "";
    if(window.screen.availWidth < 700) {
        padding = "0";
        margin = "8px 0";
        flexDirection = "column";
    } else {
        padding = "1.5em 8em";
        margin = "1em";
        flexDirection = "row"
    }
    return (
        <div className={classes.Roadmap}>
            <Title style={{color: "#FFFFFF"}}>Roadmap</Title>
            <Card style={{backgroundColor: "#FFFFFF", padding: padding, margin: margin, alignItems: "flex-start", flexDirection: flexDirection}}>
                {
                    props.data !== undefined && props.data.length !== 0
                    ? props.data.map((col, index) => {
                        let completedLabels = 0;
                        let totalLabels
                        if(col.data !== undefined) {
                            totalLabels = col.data.length;
                        } else {
                            totalLabels = 0;
                        }

                        for(let i = 0; i < totalLabels; i++) {
                            if(col.data[i].checked) {
                                completedLabels++;
                            }
                        }

                        return (
                            <Aux key={col.title + "-" + index}>
                                <Card shadow style={{
                                    flexGrow: 1, 
                                    flexDirection: "column", 
                                    margin: "1em", 
                                    padding: "10px 15px", 
                                    height: window.screen.availHeight - 350,
                                    overflow: "auto",
                                    width: "82%"
                                }}>
                                    <div className={classes.ColTitle}>
                                        <Title style={{textTransform: "capitalize"}}>
                                            {col.title} 
                                            <span>({totalLabels})</span>
                                            <span className={classes.completedCounters}><span>[{parseInt(totalLabels, 10) - parseInt(completedLabels, 10)}]</span> <span className={classes.completedLabels}>[{completedLabels}]</span></span>
                                        </Title>
                                    </div>
                                    <div style={{marginTop: "2em", width: "100%", height: window.screen.availHeight - 350}}>
                                        {
                                            totalLabels === 0
                                            ? (
                                                <div className={classes.TaskComplete} style={{height: window.screen.availHeight - 450}}>
                                                    <img src={EmptyBoxImg} alt="No Tasks"/>
                                                    <p>Nothing is in here</p>
                                                </div>
                                              )
                                            : !props.showCompleted && totalLabels === completedLabels
                                                ? (
                                                    <div className={classes.TaskComplete} style={{height: window.screen.availHeight - 450}}>
                                                        <img src={TaskCompleteImg} alt="All Task Completed" />
                                                        <p>All tasks have been completed in this section</p>
                                                    </div>
                                                  )
                                                : null
                                        }
                                        {
                                            totalLabels > 0
                                            ? col.data.map((content, contentIndex) => {
                                                return !content.checked
                                                    ? (
                                                        <Aux key={contentIndex}>
                                                            <ContentCard
                                                                type="roadmap"
                                                                rootIndex={index}
                                                                entryId={content.id}
                                                                label={content.title}
                                                                votes={content.votes}
                                                                voted={content.voted}
                                                                loading={props.loading}
                                                                checked={content.checked}
                                                                childIndex={contentIndex}
                                                                style={{flexDirection: "row"}}
                                                                voterRendered={props.voterRendered}
                                                                votesUpClicked={props.votesUpClicked}
                                                                checkBoxClicked={props.checkBoxClicked}/>
                                                        </Aux>
                                                      )
                                                    : props.showCompleted
                                                        ? (
                                                            <Aux key={contentIndex}>
                                                                <ContentCard
                                                                    type="roadmap"
                                                                    rootIndex={index}
                                                                    entryId={content.id}
                                                                    label={content.title}
                                                                    votes={content.votes}
                                                                    voted={content.voted}
                                                                    loading={props.loading}
                                                                    checked={content.checked}
                                                                    childIndex={contentIndex}
                                                                    style={{flexDirection: "row"}}
                                                                    voterRendered={props.voterRendered}
                                                                    votesUpClicked={props.votesUpClicked}
                                                                    checkBoxClicked={props.checkBoxClicked}/>
                                                            </Aux>
                                                          )
                                                        : null
                                            })
                                            : null
                                        }
                                    </div>
                                </Card>
                            </Aux>
                        )
                    })
                    : <Loader />
                }
            </Card>
        </div>
    );
}

export default roadmap;