import React from "react";
import './select.style.scss';


const Select = ({ options, handleChange, ...otherProps }) => (
  <div className="group" >
    <select className="no-border"  onChange={handleChange} {...otherProps} >

      {options.map(option => (
        <option key={option}>{option}</option>
      ))}

    </select>
  </div>
)

export default Select;
