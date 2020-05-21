import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import './dropdown-menu.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import FormDialog from '../edit-component/edit-text.component';

import 'firebase/firestore';

const firestore = firebase.firestore();


export default function DropdownMenu({postID}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDeletePost = async() => {
        handleClose();
        firestore.collection('posts').doc(`${postID}`).delete().
        then(() => {console.log("hase been deleted successfully ")}).catch((error)=>{console.log(error)});
        var  usersRef = await firestore.collection("comments").where("postID" , "==" , `${postID}`).get();
        var deletedComments = usersRef.docs.map(doc => doc.id);

        deletedComments.forEach((id) => {
            firestore.collection("comments").doc(`${id}`).delete();
        })
        console.log(deletedComments)

       
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
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                <span><FormDialog collection="posts" id={postID}/></span>
                    تعديل
            <FontAwesomeIcon style={{position:"absolute", left:"20%"}} icon={faEdit} color="grey" size="1x" transform="left-5"  />
                </MenuItem>
                <MenuItem onClick={handleDeletePost}>
                    حذف
            <FontAwesomeIcon style={{position:"absolute", left:"20%"}} icon={faTrash} color="grey" size="1x" transform="left-5" />
                </MenuItem>
            </Menu>
        </div>
    );
}
