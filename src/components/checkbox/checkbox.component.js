import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './checkbox.style.scss';

const  CheckBox = () => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <FormGroup aria-label="position" row >
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="تذكر كلمة السر"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckBox;