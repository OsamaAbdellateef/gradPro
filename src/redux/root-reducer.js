import {combineReducers} from 'redux';
import userReducer from './user/user-reducer';
import contactReducer from './contact/contact-reducer';

export default combineReducers ({
    user:userReducer,
    contact:contactReducer
})