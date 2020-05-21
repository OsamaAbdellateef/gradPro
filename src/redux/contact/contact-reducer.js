import { initializeApp } from "firebase"

const INITIAL_STATE = {
    message:'',
    name:'',
    email:''
}

const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HANDLE_CHANGE':
            return {
                ...state,
                [action.name]: action.payload
            }
   
        default:
            return state;

    }
}

export default contactReducer;