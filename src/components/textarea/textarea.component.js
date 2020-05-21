import React from 'react';
import './textarea.style.scss';
import '../form-input/form-input.style.scss';

const Textarea = ({label , length , ...otherProps}) => (
    <div className="group">
        <textarea  {...otherProps} className="form-input"></textarea>
        {
            <label className={`${length ? 'shrink' :'' } form-input-label`}>{label}</label>
        }
    </div>
)

export default Textarea;