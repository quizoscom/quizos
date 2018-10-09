import React from 'react';
import CountUp from 'react-countup';

import classes from './Voter.css';

import UpTriangleImg from '../../../assets/up-triangle.png';

const voter = props => {
    return (
        <div
            className={!props.loading ? classes.Voter : classes.VoterDisabled}
            style={props.voted ? {boxShadow: "0 2px 2px 0 rgba(95,44,130,0.54), 0 3px 1px -2px rgba(95,44,130,0.52), 0 1px 5px 0 rgba(95,44,130,0.5)"} : null}
            onClick={!props.loading ? () => props.votesUpClicked(props.type, props.rootIndex, props.childIndex, props.entryId) : null}>
            <img src={UpTriangleImg} alt="Vote"/>
            {
                !props.voterRendered
                ? <CountUp 
                    end={parseInt(props.votes, 10)}
                    duration={1}
                    delay={0.5}
                    redraw={false} />
                : <p>{props.votes}</p>
            }
        </div>
    );
}

export default voter;