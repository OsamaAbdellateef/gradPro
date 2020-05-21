import React from 'react';
import './icon-box.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const IconBox = ({ iconName, header, description }) => (
    <div className="icon-box col-12 col-md-4 text-center ">
        <div className="box-content text-center ">
        <FontAwesomeIcon icon={iconName} size="lg" transform="left-4" color="#3587D7" />
        <h5 className="text-center font-weight-bold m-3">{header}</h5>
        <p className="text-center box-desc">{description}</p>
        </div>
    
    </div>
)

export default IconBox;