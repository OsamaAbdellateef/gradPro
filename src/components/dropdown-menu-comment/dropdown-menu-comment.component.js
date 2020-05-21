import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import FormDialog from '../edit-component/edit-text.component';
import './dropdown-menu-comment.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import 'firebase/firestore';




const firestore = firebase.firestore();


export default function DropdownMenuComment({commentID}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDeleteComment = async() => {
        handleClose();
        firestore.collection('comments').doc(`${commentID}`).delete().
        then(() => {console.log("hase been deleted successfully ")}).catch((error)=>{console.log(error)});
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                <FontAwesomeIcon style={{ marginLeft: "15px" }} icon={faEllipsisV} color="grey" size="lg" transform="left-5" />
            </Button>
            <Menu
                autoFocus={false}
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                <span><FormDialog collection="comments" id={commentID}/></span>
                تعديل
                
                  <FontAwesomeIcon style={{position:"absolute", left:"20%"}} icon={faEdit} color="grey" size="1x" transform="left-5"  />
                </MenuItem>
                <MenuItem  
                autoFocus={false} onClick={handleDeleteComment}>
                   حذف
            <FontAwesomeIcon style={{position:"absolute", left:"20%"}} icon={faTrash} color="grey" size="1x" transform="left-5" />
                </MenuItem>
            </Menu>
            
        </div>
    );
}
