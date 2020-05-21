import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/auth';


 const config = {
  apiKey: "AIzaSyBumHDS13cDcCcM_Zd1sLnTDR9OGVE4-zc",
    authDomain: "crwd-4a680.firebaseapp.com",
    databaseURL: "https://crwd-4a680.firebaseio.com",
    projectId: "crwd-4a680",
    storageBucket: "crwd-4a680.appspot.com",
    messagingSenderId: "1075919691373",
    appId: "1:1075919691373:web:79c01f88b5bde7348e2964",
    measurementId: "G-TJ5CDN8KXD"
};

export const createUserProfileDocument = async(userAuth , additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  //console.log('this is the snapshot' , snapshot);
  if(!snapshot.exists) {
    const {displayName , email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user ' , error.message);
      
    }

  }

  return userRef;
}

firebase.initializeApp(config);
const storage = firebase.storage();

export const auth = firebase.auth();
export const firestore  = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export {
  storage , firebase as default
}