import React from 'react';
import './form-input.style.scss';


const FormInput = ({label , length , ...otherProps}) => (
    <div className="group">
        <input  {...otherProps} className="form-input"/> 
        {
            <label className={`${length ? 'shrink' :'' } form-input-label`}>{label}</label>
        }
    </div>
)

export default FormInput;