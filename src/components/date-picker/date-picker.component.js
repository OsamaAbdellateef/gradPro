import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './date-picker.style.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({handleChange}) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
      onChange={handleChange}
        id="date"
        label="تــاريخ الميلاد"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
