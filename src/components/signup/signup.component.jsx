import React from 'react';
import './signup.style.scss';
import FormInput from '../form-input/form-input.component';
import RadioComp from '../radio/radio.component';
import IconButton from '../icon-button/icon-button.component';
import { Button } from 'react-bootstrap';
import Hr from '../hr/hr.component';
import Select from '../select/select.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import firebase from 'firebase';
import Error from '../error/error.component';
import BirthDate from '../bd-input/bd-input.component';
import FileInput from '../file-input/file-input.component';
import { storage } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { handle_change, set_image_url, test, setImage, setImageURL, set_state } from '../../redux/user/user.actions'

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


class Signup extends React.Component {


    
    componentDidMount() {
        window.scrollTo(0, 0);
       //document.title = "عمل حساب جديد "
    }

    handleSubmit = async event => {

        event.preventDefault();
        const { address, craft, displayName, email, password, confirmPassword, day, month, year, phoneNumber, set_state, signedAs, imageCraftURL, imagePersonalURL, imageIdent, imageIdentURL } = this.props;
        console.log("IMAAAAAAAAAGE IDent URL : ", imageIdentURL);

        if (password != confirmPassword) {
            set_state("validationProblem", "passwordNotMatched")
            return;
        }

        try {
            var userID = Math.random().toString(36).substr(2, 9);
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName, password,userID, craft, day, address, imagePersonalURL, month, year, phoneNumber, signedAs, imageCraftURL, imageIdentURL });

        } catch (error) {
            const firebaseError = error.message;
            if (firebaseError == "The email address is already in use by another account.") {
                set_state("validationProblem", "email");
                console.log('validation problem : the email is already used');
            } else if (firebaseError == "Password should be at least 6 characters") {

                set_state("validationProblem", "passwordLength");

            }

            console.log(error.message);
            console.log(error);
        }
    }




    handleChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(value);
        })

    }

    handleFileChange = (e) => {
        const { setImage, imageIdentURL, imagePersonalURL, imagePersonal, set_state, imageCraftURL } = this.props;
        let image = null;
        if (e.target.files[0]) {
            image = e.target.files[0];
            setImage(e.target.name, image);
        }

        if (e.target.name == "imageIdent") {
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
                        this.props.setImageURL('imageIdentURL', url);
                        console.log("State URL : ", imageIdentURL);
                    })
                })
        } else if (e.target.name == "imageCraft") {
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
                        this.props.setImageURL("imageCraftURL", url);
                        console.log("State URL : ", imageCraftURL);
                    })
                })
        } else {
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
                        this.props.setImageURL("imagePersonalURL", url);
                        console.log("State URL : ", imagePersonalURL);
                    })
                })
        }
    }


    /*
        handleUpload = () => {
            const { imageCraft, imageIdent } = this.props;
            const uploadTask1 = storage.ref(`images/${imageCraft.name}`).put(imageCraft);
    
            const uploadTask2 = storage.ref(`images/${imageIdent.name}`).put(imageIdent);
    
            uploadTask1.on('state_changed',
                (snapshot) => {
                    //progress
                }, (error) => {
                    console.log(error);
    
                }, () => {
                    storage.ref('images').child(imageCraft.name).getDownloadURL().then(url => {
                        this.props.setImageURL("imageCraftURL", url);
    
                    })
                })
    
            uploadTask2.on('state_changed',
                (snapshot) => {
                    //progress
                }, (error) => {
                    console.log(error);
    
                }, () => {
                    storage.ref('images').child(imageIdent.name).getDownloadURL().then(url => {
                        this.props.setImageURL("imageIdentURL", url);
                    })
                })
        }
    */



    render() {
        document.title="dw";
        const { handle_change, address, email, password, confirmPassword, phoneNumber, craft, day, month, year, image, imageIdent, imageIdentURL, imageCraftURL, number, imageCraft, setAddress, displayName, imagePersonalURL, imagePersonal, validationProblem, set_state, signedAs } = this.props;
        return (
            <div className="sign-up mb-5">
                <div className="container">
                    <h1 className="mt-large mb-5">عمل حساب جديد </h1>

                    <RadioComp onChange={(e) => {
                        set_state("signedAs", e.target.value);
                    }} />


                    <hr></hr>
                    <form onSubmit={this.handleSubmit}>

                        <FormInput length={displayName.length} name="displayName" type="text" required value={displayName} onChange={(e) => { handle_change("displayName", e.target.value) }}
                            label="الاسم كاملا" />


                        <FormInput length={email.length} name="email" type="text" value={email} required onChange={(e) => { handle_change("email", e.target.value) }}
                            label="البريد الالكتروني" />
                        {
                            validationProblem == "email" ? (<Error>هذا البريد الالتكتروني تم استخدامه من قبل</Error>) : (null)
                        }


                        <FormInput length={address.length} name="address" type="text" required value={address} onChange={(e) => { handle_change("address", e.target.value) }}
                            label="العنوان " />

                        <FormInput length={phoneNumber.length} name="phoneNumber" type="number" value={phoneNumber} required onChange={(e) => { handle_change("phoneNumber", e.target.value) }}
                            label="رقم الهاتف" />




                        <FormInput length={password.length} name="password" type="password" required value={password}  onChange={(e) => {
                            handle_change("password", e.target.value)
                        }} label="كلمة السر  " />
                        {
                            validationProblem == "passwordLength" ? (<Error>كلمة السر يجب أن تكون على الاقل 6 أحرف</Error>) : (null)
                            
                        }

                        <FormInput length={confirmPassword.length} name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => {
                            handle_change("confirmPassword", e.target.value)
                        }}
                            label=" تأكيد كلمة السر " />

                        {validationProblem == "passwordNotMatched" ? (<Error>كلمتي السر غير متطابقتين</Error>) : (null)}




                        {
                            signedAs == "worker" ? (
                                <Select options={["سباك", "محار", "كهربائي"]} onChange={(e) => {
                                    handle_change("craft", e.target.value)
                                }} />
                            ) : (null)
                        }

                        

                        <BirthDate required />

                        {/* uploading images */}

                        <FileInput name="imagePersonal" onChange={this.handleFileChange} className="form-input" imageIdentURL imageplaceholder={imagePersonal ? (imagePersonalURL ? ("تم رفع الصورة بنجاح") : "يتم رفع الصورة... ") : "اضغط لرفع الصورة الشخصية "} accept=".jpg , .png , jpeg" />


                        {/*if he is a worker */}
                        {
                            signedAs == "worker" ? (
                                <FileInput name="imageIdent" onChange={this.handleFileChange} className="form-input" imageIdentURL imageplaceholder={this.props.imageIdent ? (imageIdentURL ? ("تم رفع الصورة بنجاح") : "يتم رفع الصورة... ") : "اضغط لرفع صورة البطاقة"} accept=".jpg , .png , jpeg" />
                            ) : (null)
                        }


                        {
                            signedAs == "worker" ? (
                                <FileInput className="form-input" imageplaceholder={this.props.imageCraft ? (imageCraftURL ? ("تم رفع الصورة بنجاح") : "يتم رفع الصورة... ") : "اضغط لرفع صورة بطاقة مزاولة المهنة"} accept=".jpg , .png , jpeg"
                                    name="imageCraft" onChange={this.handleFileChange}
                                />
                            ) : (null)
                        }
                        <Button disabled={this.props.signedAs == "worker" ? !(this.props.imageIdentURL && this.props.imageCraftURL && this.props.imagePersonalURL) : !(this.props.imagePersonalURL)} type="submit" style={{ marginTop: "50px", padding: "10px 50px" }}>إنشاء حساب</Button>
                    </form>


                </div>

            </div>
        )
    }

}



const mapStateToProps = ({ user }) => {
    return {
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        phoneNumber: user.phoneNumber,
        address: user.address,
        craft: user.craft,
        day: user.day,
        month: user.month,
        year: user.year,
        imageIdent: user.imageIdent,
        imageIdentURL: user.imageIdentURL,
        imageCraft: user.imageCraft,
        imageCraftURL: user.imageCraftURL,
        imagePersonal: user.imagePersonal,
        imagePersonalURL: user.imagePersonalURL,
        signedAs: user.signedAs,
        progress: user.progress,
        validationProblem: user.validationProblem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handle_change: (name, value) => dispatch(handle_change(name, value)),
        setImage: (imageName, imageObject) => dispatch(setImage(imageName, imageObject)),
        setImageURL: (imageType, imageURL) => dispatch(setImageURL(imageType, imageURL)),
        set_state: (stateName, value) => dispatch(set_state(stateName, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
