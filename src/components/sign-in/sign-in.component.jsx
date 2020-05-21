import React from 'react';
import './sign-in.style.scss';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import IconButton from '../icon-button/icon-button.component';
import CheckBox from '../checkbox/checkbox.component';
import { handle_change, set_state } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import Error from '../error/error.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        const { set_state, email, password } = this.props
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            set_state("email", "");
            set_state("password", "");

        } catch (error) {
            console.log('error', error);
            set_state("validationProblem", "true")
        }

    }



    render() {
        const { handle_change, validationProblem,set_state  , email  , password} = this.props;
        return (
            <div className="sign-wrapper mb-5">
                <div className="container">
                    <div className="row">
                        <div className="sign-in col p-5 col-12 col-lg-6">
                            <h2 className="text-capitalize  mb-5 "> تسجيل الدخول</h2>
                            <IconButton
                                additionalclass="mr-0  "
                                onClick={signInWithGoogle}
                                iconName="google">
                                تسجيل الدخول باستخدام جوجل
                            </IconButton>
                            <Error>Hello there </Error>
                            {validationProblem == "true" ? (<Error>كلمة السر أو البريد الاتكتروني غير صحيح</Error>):(null)}
                            <hr className="hr-text text-center " data-content="أو"></hr>
                            <span  >سجل باستخدام البريد الالكتروني وكلمة السر الخاصة بك </span>
                            <form>
                            
                            <FormInput length={email.length} name="email" type="text" value={email} required onChange={(e) => { handle_change("email", e.target.value) }}
                            label="البريد الالكتروني" />
                            <FormInput length={password.length} name="password" type="password" required value={password} onChange={(e) => {
                            handle_change("password", e.target.value)
                        }} label="كلمة السر  " />

                                

                                <div className="checkbox-container">
                                    <CheckBox />
                                </div>
                                <Button onClick={this.handleSubmit} type="submit" className=" py-3 px-4 ml-3">
                                    تسجيل الدخول
                                 </Button>
                                <span>أو</span>
                                <Button className="p-3 m-0 mb-3 mb-lg-0 mr-lg-3 border-0 bg-success" onClick={() => { this.props.history.push("signup") }} >
                                    عمل حساب جديد
                                    {this.props.address}
                                </Button>

                            </form>
                        </div>
                        <div className="col grad-background col-md-0 col-6">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({user}) => {
    return {
        email: user.email,
        password: user.password,
        validationProblem:user.validationProblem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {handle_change: (name, value) => dispatch(handle_change(name, value)),
    set_state: (stateName, value) => dispatch(set_state(stateName, value))}
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(SignIn));