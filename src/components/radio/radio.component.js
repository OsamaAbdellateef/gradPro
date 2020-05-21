import React from 'react';
import './radio.style.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const RadioComp = ({...otherProps}) => (
    <FormControl component="fieldset">
      <FormLabel component="legend">عمل حساب كـ:</FormLabel>
      <RadioGroup aria-label="position" name="position"  defaultValue="worker" row>
      
        <FormControlLabel
          value="client"
          control={<Radio {...otherProps} color="primary" />}
          label="عميــل"
          labelPlacement="ds"
        />

        <FormControlLabel
          value="worker"
          control={<Radio {...otherProps} color="primary" />}
          label="حرفــي"
          labelPlacement=""
        />
      </RadioGroup>
    </FormControl>
)
export default RadioComp;
