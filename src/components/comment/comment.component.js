import React from 'react';
import './comment.style.scss';

const Comment = (createdAt , body , userImage , userName) => (
    <div className="comment">
        <img src={userImage} />
        <h1>{body}</h1>
    </div>
)

export default Comment;
