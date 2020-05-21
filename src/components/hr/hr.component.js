import React from 'react';
import './hr.scss';

const Hr = ({content}) => (
<hr className="hr-text text-center " data-content={content} ></hr>
)

export default Hr;
