import React, { useState ,useEffect } from 'react';
//import Button from '@material-ui/core/Button';
import { Button ,DropdownButton ,Dropdown} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import './request-form.style.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';

const RequestForm = ({ currentUser,craft, crafterID ,displayName}) => {
  const [open, setOpen] = useState(false);
  const [nameValue, setName] = useState("");
  const [phoneNumberValue, setPhoneNumber] = useState("");
  const [addressValue, setAddress] = useState("");
  const [requested , setRequest] = useState(false);
  const [requests , setRequests] = useState([]);
  const today = new Date();

  const getReq = async() => {
    var  usersRef = await firestore.collection("requests").get().then(console.log("hello there "));
    var recievedRequests = usersRef.docs.map(doc => doc.data());
    setRequests(recievedRequests)

  }
  
  useEffect( () => {
    getReq();
    
  },[]);

useEffect(() => {
  checkRequests();
},[requests])

  const checkRequests = () => {
    requests.forEach(request => {
      if(currentUser.userID == request.userID && crafterID == request.crafterID) {
        console.log('you have made this request ');
        setRequest(true)
      }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
    console.log(crafterID)
  };

  const handleClose = () => {
    clearStates();
    setOpen(false);
  };

  const firestore = firebase.firestore();

  //sending request to firebase 

  const clearStates = () => {
    setName("");
    setAddress("");
    setPhoneNumber("")
  }

  const addRequest = () => {

    var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date())


    var nid = Math.random().toString(36).substr(2, 9);


    firestore.collection("requests").doc(`${nid}`).set({
      clientName: `${nameValue}`,
      userID: `${currentUser.userID}`,
      phoneNumber: `${phoneNumberValue}`,
      address: addressValue,
      createdAt: myFirebaseFirestoreTimestampFromDate,
      crafterID: `${crafterID}`,
      requestID:`${nid}`,
      crafterName: `${displayName}`,
      craft: `${craft}`,
      accepted:`${false}`

    })
      .then(function () {
        console.log("Document successfully written!");
        setAddress("");
        clearStates();
        handleClose();
        setRequest(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }

  const showTime  = async() => {
    requests.forEach(request => {console.log(request)})
  }

  const deleteRequest = async(crafterID) => {

    var  usersRef = await firestore.collection("requests").get().then(console.log("hello there "));
    var requests = usersRef.docs.map(doc => doc.data());

    requests.forEach(request => {
      if(request.userID == currentUser.userID && crafterID == request.crafterID) {
        firestore.collection('requests').doc(`${request.requestID}`).delete().then(() => {console.log('deleted successfully ');
      setRequest(false)}).catch((error) => {console.log(error)});
      }

    })

    // firestore.collection('requests').doc(`${reqID}`).delete().
    // then(() => {console.log("hase been deleted successfully ")}).catch((error)=>{console.log(error)});

  }

  return (

    <div>
      {requested ? (<DropdownButton variant="success" id="dropdown-basic-button" title="تم الطلب بنجاح ">
      <Dropdown.Item onClick={() => {deleteRequest(crafterID)}}>الغاء الطلب </Dropdown.Item>
  </DropdownButton>) : (<Button   onClick={handleClickOpen}>
         اطلب الآن 
      </Button>)}
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ارسال طلب </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=" الاسم كاملا"
            type="text"
            fullWidth
            onChange={(e) => { setName(e.target.value) }}
          />
          <TextField

            margin="dense"
            id="address"
            label="العنوان بالتفصيل"
            type="address"
            fullWidth
            onChange={(e) => { setAddress(e.target.value) }}
          />
          <TextField
            margin="dense"
            id="pn"
            label="رقم الهاتف"
            type="tel"
            fullWidth
            onChange={(e) => { setPhoneNumber(e.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button className="mr-0 ml-2" disabled={!(nameValue && phoneNumberValue && addressValue)} onClick={addRequest}>ارسال</Button>
          <Button variant="danger" onClick={handleClose}>اغلاق </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(RequestForm)