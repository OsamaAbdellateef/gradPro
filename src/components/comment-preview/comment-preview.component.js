import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {set_state} from '../../redux/user/user.actions';
import './comment-preview.style.scss';
import TimeAgo from 'react-timeago';
import frenchStrings from 'react-timeago/lib/language-strings/ar';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import DropdownMenuComment from '../dropdown-menu-comment/dropdown-menu-comment.component';

const formatter = buildFormatter(frenchStrings)

//getting the comments 

//filtering them based on post_id if they are matched

const firestore = firebase.firestore();


class  CommentPreview  extends React.Component {
 
    componentDidMount() {
        const {comments,postID,set_state} = this.props
        var arr = [];
        firestore.collection('comments').onSnapshot(function(querySnapshot) {
            arr = []; 
            querySnapshot.forEach(doc => {
                //console.log("comment : " , doc.data());
                  
                arr.push(doc.data());           
            }) 

        
             if(arr.length > 0) {
                 set_state("loading" , false);
             }

             for (let i = 1; i < arr.length; i++) {
                let j = i - 1
                let temp = arr[i]
                while (j >= 0 && arr[j].createdAt.seconds > temp.createdAt.seconds) {
                  arr[j + 1] = arr[j]
                  j--
                }
                arr[j+1] = temp
              }

            set_state('comments' , arr);
            console.log("commmmmmmmmmmmmmmments")
       });
        
    }
        
render() {
        const {currentUser} = this.props
return (
    <div className="comment-preview">
            <span>{
                this.props.comments.map((comment) => (
                comment.postID ===   this.props.postID ? (
                <div className="comment">
                    <div className="comment-upper-part">

                        <div className="image-container">
                        <img src={comment.userImage} />
                        </div>
                        <p>{comment.userName}</p>
                        <TimeAgo date={comment.createdAt.toDate()} formatter={formatter} />
                        {currentUser ? (currentUser.id == comment.userID ? (<DropdownMenuComment
                            commentID={comment.commentID} />):(null)):(null)}
                    </div>
                    <h5></h5>   
                    <p>{comment.body}</p>
                </div>
                
                ):(null)
                ))
                }</span>
    </div>
    )
}

    }
const mapStateToProps = ({ user }) => {
    return {
        post: user.post,
        currentUser: user.currentUser,
        posts: user.posts,
        loading:user.loading,
        imagePostURL: user.imagePostURL,
        image: user.image,
        progress: user.progress,
        comments:user.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_state: (stateName, value) => dispatch(set_state(stateName, value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentPreview);

