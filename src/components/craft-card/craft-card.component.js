import React from 'react';
import './craft-card.style.scss';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faUser,faTools, faAddressCard,faPhone,faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import RequesForm from '../request-form/reques-form.component';

const CraftCard = ({ imageCraftURL,crafterID, imagePersonalURL,craft, displayName, address,userID, phoneNumber, ...otherProps }) => (
    <div className="col-12 col-md-6 col-lg-3 mb-5 col craft-card"  {...otherProps} >
        <div className="content">
            <div className="image-container">
                <img src={`${imagePersonalURL}`} />  
            </div>
            <div className="details">
                <h5><FontAwesomeIcon icon={faUser}  size="sm" transform="left-4" color="#3587D7" />{displayName}</h5>
                <h5> <FontAwesomeIcon icon={faPhone}  size="sm" transform="left-4" color="#3587D7" /> {phoneNumber}</h5>
                <h5><FontAwesomeIcon icon={faTools}  size="sm" transform="left-4" color="#3587D7" />{craft}</h5>
                <h5><FontAwesomeIcon icon={faAddressCard}  size="sm" transform="left-4" color="#3587D7" />{address}</h5>
                
                {console.log("the name is : " , displayName)    
                }
                <RequesForm crafterID={crafterID} craft={craft} displayName={displayName} />
            </div>
        </div>
    </div>
)

export default CraftCard;