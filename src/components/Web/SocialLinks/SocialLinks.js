import React from 'react';
import { ReactComponent as YoutubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/svg/linkedin.svg';
import './SocialLinks.scss';

export default function SocialLinks() {
    return(
        <li className="social-links">
            <a 
                href="https://www.youtube.com"
                className="youtube"
                target="_blank"
                rel="noopened noreferred"
            >
                <YoutubeIcon />
            </a>
            <a 
                href="https://www.twitter.com"
                className="twitter"
                target="_blank"
                rel="noopened noreferred"
            >
                <TwitterIcon />
            </a>
            <a 
                href="https://www.facebook.com"
                className="facebook"
                target="_blank"
                rel="noopened noreferred"
            >
                <FacebookIcon />
            </a>
            <a 
                href="https://www.linkedin.com"
                className="linkedin"
                target="_blank"
                rel="noopened noreferred"
            >
                <LinkedinIcon />
            </a>
        </li>
    );
}