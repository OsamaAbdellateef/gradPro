import React from 'react';
import './underline-header.style.scss';

const UnderlineHeader = ({children , ...otherProps}) => (
<div className="underline-header-container  mb-5 ">
<h1 {...otherProps} >{children}</h1>
</div>
)

export default UnderlineHeader;