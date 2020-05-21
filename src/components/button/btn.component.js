import React from 'react';
import './btn.style.scss';
import {Link} from 'react-router-dom';
const BtnLink = ({children , ...otherProps}) => (
    <Link {...otherProps}>{children}</Link>
)

export default BtnLink;