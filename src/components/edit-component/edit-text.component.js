import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Textarea from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './edit-text.style.scss';


const firestore = firebase.firestore();

export default function FormDialog({collection, id}) {
  const [open, setOpen] = React.useState(false);
  const [value , setValue] = React.useState('');


  const handleEdit = () => {
    setOpen(false);
    firestore.collection(`${collection}`).doc(`${id}`).update({
      body:value
    });
    setValue('')
  }

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{position:'absolute' , left:'0' , top:'0' , width:'100%', opacity:'0'}} variant="outlined" color="primary" onClick={handleClickOpen}>
        trash talk 
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">التعديل </DialogTitle>
        <DialogContent>
          <DialogContentText style={{opacity:"0" , height:"0"}}>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="اكتب التعديل"
            type="text"
            fullWidth
            
            value={value}
            onChange={(e) => {setValue(e.target.value);
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{position:"relative "}}>
            اغلاق
          </Button>
          <Button onClick={handleEdit} color="primary" style={{position:"relative"}}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
