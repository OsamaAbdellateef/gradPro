import React from 'react';
import './icon-button.style.scss';
import { faThumbsUp  } from '@fortawesome/free-solid-svg-icons';
import { SocialMediaIconsReact } from 'social-media-icons-react';

const IctonButotn = ({iconName,additionalclass  , children , ...otherProps}) => (
    <button type="submit" className={`button ${additionalclass}`} {...otherProps} >
        <div className="icon-wrapper">
            <img src={require(`../../images/icons/${iconName}.png`)} />
           
        </div>
        {children}
    </button>
)

export default IctonButotn;