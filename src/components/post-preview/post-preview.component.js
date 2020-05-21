import React from 'react';
import './post-preview.style.scss';
import Post from '../post-card/post-card.component';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import moment from 'moment';


class PostPreview extends React.Component {
    render() {
        const posts = this.props.posts;
        return (
            <div className="post-preview mt-5">
                {posts.map(post => (
                    <Post
                        id={post.id}
                        body={post.body}
                        userID={post.userID}
                        userImage={post.userImage}
                        userName={post.userName}
                        createdAt={post.createdAt}
                        imgPostURL={post.imgPostURL}
                        postID={post.post_id}

                        />
                ))}
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {

        post: user.post,
        currentUser: user.currentUser,
        posts: user.posts
    }
}

// const mapStateToProps = ({ user }) => {
//     return {
//         post: user.post,
//         currentUser: user.currentUser,
//         posts: user.posts
//     }
// }

export default connect(mapStateToProps)(PostPreview);
