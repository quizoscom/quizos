import React from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share'; //https://github.com/nygardk/react-share
import FacebookIcon from '../../assets/facebook-icon.png';
import TwitterIcon from '../../assets/twitter-icon.png';
import LinkedInIcon from '../../assets/linkedin-icon.png';
import WhatsAppIcon from '../../assets/whatsapp-icon.png';
import GmailIcon from '../../assets/gmail-icon.png';

import classes from './ShareLink.css';

const shareLink = (props) => {
    const shareDesc = `Evaluate yourself with this ${props.difficulty} level ${props.language}`;
    const url = "evaluiz.com";
    return (
        <div className={classes.ShareLink}>
            <p className={classes.Title}>Congratulations, Your Quiz is Successfully Created</p>
            <p>Use the given link to share your quiz</p>
            <p className={classes.Link}>{props.shareLink}</p>
            <div className={classes.ShareCont}>
                <p>Share</p>
                <FacebookShareButton url={url} quote={shareDesc} ><img src={FacebookIcon} alt="Facebook Icon"/></FacebookShareButton>
                <TwitterShareButton url={url} via="evaluiz" title={shareDesc}><img src={TwitterIcon} alt="Twitter Icon"/></TwitterShareButton>
                <LinkedinShareButton url={url} description={shareDesc}><img src={LinkedInIcon} alt="LinkedIn Icon"/></LinkedinShareButton>
                <WhatsappShareButton url={url} title={shareDesc}><img src={WhatsAppIcon} alt="WhatsApp Icon"/></WhatsappShareButton>
                <EmailShareButton url={url} body={shareDesc} subject="evaluiz.com"><img src={GmailIcon} alt="Gmail Icon"/></EmailShareButton>
            </div>
        </div>
    );
};

export default shareLink;