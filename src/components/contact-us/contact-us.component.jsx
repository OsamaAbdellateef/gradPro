import React from 'react';
import UnderlineHeader from '../underline-header/underline-header.component';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faTools, faAddressCard, faPhone, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconBox from '../icon-box/icon-box.component';
import './contact-us.style.scss';
import FormInput from '../form-input/form-input.component';
import { connect } from 'react-redux';
import { handle_change } from '../../redux/contact/contact-action';
import { Button } from 'react-bootstrap';
import Textarea from '../textarea/textarea.component';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const handle = (email , message) => {
    firestore.collection('mail').add({
        to: email,
        message: {
          subject: message,
          html: 'This is an <code>HTML</code> email body.',
        },
      })
}

const ContactUs = ({ message, email, name, handle_change }) => (
    <div className="contact-us container text-center ">
        <div className="row">
            <div className="col-12 contact-header">
                <UnderlineHeader>
                    تواصل معنا
                </UnderlineHeader>
                <div className="row">
                    <IconBox iconName={faEnvelope} header="البريد الالكتروني" description="SANETNA.ESTABIENA@GMAIL.COM" />
                    <IconBox iconName={faPhone} header="رقم الهاتف" description="01116113544" />
                    <IconBox iconName={faAddressCard} header=" العنوان" description="our location is in London" />
                </div>
            </div>
            <form className="col-6">
                <FormInput length={name.length} name="message" type="text" required value={name} onChange={(e) => { handle_change("name", e.target.value) }}
                    label="الاسم كاملا" />
                <FormInput length={email.length} name="email" type="text" value={email} required onChange={(e) => { handle_change("email", e.target.value) }}
                    label="البريد الالكتروني" />


                <Textarea style={{height:"100px"}} length={message.length} name="message"  value={message} required onChange={(e) => { handle_change("message", e.target.value) }}
                    label="اكتب الرسالة الخاصة بك " />



                
                <Button onClick={() => {handle(email,message)}} size="lg">send</Button>
            </form>

        </div>

    </div>
)

const mapStateToProps = ({ contact }) => {
    return {
        message: contact.message,
        email: contact.email,
        name: contact.name
    }
}

const mapDispatchToProps = (dispatch) => ({
    handle_change: (name, value) => dispatch(handle_change(name, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)