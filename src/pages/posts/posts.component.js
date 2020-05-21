import React from 'react';
import PostPreview from '../../components/post-preview/post-preview.component';
import { Button } from 'react-bootstrap';
import Textarea from '../../components/textarea/textarea.component';
import { set_state , setImage } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import './posts.style.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { storage } from '../../firebase/firebase.utils';
import './posts.style.scss';

var count = 0;
const firestore = firebase.firestore();

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue:''
        }
    }


    handleFileChange = (e) => {
        const { setImage,imagePostURL, set_state} = this.props;
        let image = null;
        if (e.target.files[0]) {
            image = e.target.files[0];
            setImage(e.target.name, image);
        }
        
        
            const uploadTask = storage.ref(`images/${image.name}`).put(image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    //progress
                     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                     set_state("progress", progress);
                }, (error) => {
                    console.log(error);

                }, () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        set_state('imagePostURL', url);
                    })
                })
               
    }

     
      

    async componentDidMount() {
        const {set_state} = this.props;

    
        var arr = [];
        firestore.collection('posts').onSnapshot(function(querySnapshot) {
            arr = []; 
            querySnapshot.forEach(doc => {
                console.log("new post : " , doc.data());
                  
                arr.push(doc.data());           
            }) 
             if(arr.length > 0) {
                 set_state("loading" , false);
             }
             
             //insertion sort for posts based on time 
             for (let i = 1; i < arr.length; i++) {
                let j = i - 1
                let temp = arr[i]
                while (j >= 0 && arr[j].createdAt.seconds < temp.createdAt.seconds) {
                  arr[j + 1] = arr[j]
                  j--
                }
                arr[j+1] = temp
              }
            
            set_state('posts' , arr);
        });
        
       
   
    }


    handleChange = e => {
        this.setState({inputValue:e.target.value})
    }

    //Adding a new post 
    addPost = () => {
        const post = this.state.inputValue;
        const imgPostURL = this.props.imagePostURL;
        this.props.set_state('imagePostURL','');

        this.setState({inputValue:''});
        const {set_state,posts} = this.props;
        var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date())

        // for converting it to hours 
        //firestore.Timestamp.fromDate(new Date()).toDate().getHours();

        // Add a new document in collection "cities",
        var nid = Math.random().toString(36).substr(2, 9);
       

        firestore.collection("posts").doc(nid).set({
            body:`${post}`,
            userID:`${this.props.currentUser.id}`,
            userImage:`${this.props.currentUser.imagePersonalURL}`,
            userName:this.props.currentUser.displayName,
            createdAt: myFirebaseFirestoreTimestampFromDate,
            imgPostURL:imgPostURL,
            post_id:nid

        })
            .then( () => {
                console.log("Document successfully written!");
               ////////
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    }


    render() {
        //const { post, set_state } = this.props;
        return (
            <div className="posts-page p-1 p-md-5 container">
                <div className="share-post">
                    <h5>انشاء منشور</h5>                  
                    
                    <Textarea style={{ height: "100px", backgroundColor: "transparent" }} length={this.state.inputValue.length} name="post" value={this.state.inputValue} required onChange={this.handleChange}
                        label="اكتب منشور" />
                    <img className="img-post d-block " src={this.props.imagePostURL} />    
                    <div className="btn-group mt-4">
                    <Button disabled={  this.props.progress !== 100} onClick={this.addPost}>نشر</Button> 
                    <Button> 
                        تحميل صورة 
                        <input onChange={this.handleFileChange} type="file" />
                    </Button>     
                    </div>   
                </div>
                <PostPreview />
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
        progress: user.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_state: (stateName, value) => dispatch(set_state(stateName, value)),
        setImage: (imageName , imageObject) => dispatch(setImage(imageName , imageObject))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Posts);
