import { initializeApp } from "firebase"

const INITIAL_STATE = {
    currentUser: null,
    id: '',
    arrs:['1','2','3'],
    address: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    day: '1',
    month: 'يناير',
    year: '1975',
    signedAs: 'worker',
    phone: '',
    craft: '',
    post:'',
    same: true,
    validationProblem: '',
    imageIdent: '',
    imageIdentURL: '',
    imageCraft: '',
    imageCraftURL: '',
    imagePersonal:'',
    imagePersonalURL:'',
    phoneNumber:'',
    progress:0,
    test:'',
    workers:[],
    electrician:[],
    plumber:[],
    mahar:[],
    clients:[],
    myCrafts:[],
    posts:[],
    imagePostURL:'',
    loading:true,
    comments:[],
    comment:'',
    ownReq:[]

}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':

            return {
                ...state,
                currentUser: action.payload
            }
        // case 'HANLDE_CHANGE':
        //     return {
        //         ...state,
        //         [action.payload[1]]: action.payload[0]
        //     }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            }
        case 'HANDLE_CHANGE':
            return {
                ...state,
                [action.name]: action.payload
            }

        case 'SET_IMAGE':
            return {
                ...state,
                [action.imageName]:action.imageObject,
                
            }    
        case 'SET_IMAGE_URL':
            return {
                ...state,
                [action.imageType]:action.imageURL
            } 
        case 'SET_STATE' :
            return {
            ...state,
            [action.stateName] :action.value
            }      
        default:
            return state;

    }
}

export default userReducer;