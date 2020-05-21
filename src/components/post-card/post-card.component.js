import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Button } from 'react-bootstrap';
import './post-card.style.scss';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import frenchStrings from 'react-timeago/lib/language-strings/ar';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import CommentPreview from '../comment-preview/comment-preview.component';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component';

const firestore = firebase.firestore();

const formatter = buildFormatter(frenchStrings)


const Post = ({ userImage, userName, hope, createdAt, imgPostURL,currentUser,id, userID, body , comment,postID , comments }) => {
    const [inputValue, setValue] = useState('');
var temp = '';

const test = () => {
    console.log(inputValue);
     
}
    const addComment = (postID) => {

      var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date())
        

        var nid = Math.random().toString(36).substr(2, 9);
        var comment = inputValue;
        setValue("");

        firestore.collection("comments").doc(`${nid}`).set({
            body:`${comment}`,
            userID:`${currentUser.id}`,
            userImage:`${currentUser.imagePersonalURL}`,
            userName:currentUser.displayName,
            createdAt: myFirebaseFirestoreTimestampFromDate,
            postID:postID,
            commentID:nid
        
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    
    }
    
    return (
        <div className="post-card mt-5 w-100">
            <div className="upper-part">
                <div className="img-container">
                    <img className="avatar" src={userImage} alt="" />
                </div>
                <div className="details">
                    <h4 className="name">{userName} <br />
                        <h5><TimeAgo date={createdAt.toDate()} formatter={formatter} /></h5>   
                    </h4>
                </div>
                {currentUser ? (currentUser.id == userID ? (<DropdownMenu
                postID={postID} />):(null)):(null)}
            </div>
            <p className="body mt-3">{body}</p>
            {imgPostURL ? (<img className="img-post w-100" src={`${imgPostURL}`} />) : (null)}
            <hr></hr>
            
            <CommentPreview postID={postID} />
            <div className="add-comment">
                
                <input className="comment-input"
                placeholder="اضف تعليق"
                type="text" onChange={(e) => {setValue(e.target.value)}} value={inputValue}  />

                <Button onClick={() => {addComment(postID)}} className="btn btn-primary edit">إضافة تعليق</Button>
            </div>
            {/*this is for puting choices icon on the current user post */ }
            
           
        </div>
    )
}

const mapStateToProps = ({ user }) => {
    return {
        comments:user.comments,
        comment:user.comment,
        currentUser: user.currentUser,

    }
}



export default connect(mapStateToProps)(Post);