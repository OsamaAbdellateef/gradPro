import React from 'react';
import './file-input.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const FileInput = ({imageplaceholder , ...otherProps}) => (
    <div className="group">
        <span className="file-placeholder">  <FontAwesomeIcon style={{marginLeft:"15px"}} icon={faUpload} color="grey" size="lg" transform="left-4" /> {imageplaceholder} </span>
        <input type="file" {...otherProps} />
    </div>
)

export default FileInput;