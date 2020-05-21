import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// this is for prsisting state after refreshing 

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    } catch(error) {
        console.log(error);
        
    }
}

function loadFromLocalStorage () {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(error) {
        console.log(error);
        return undefined 
        
    }
}

const presistedState = loadFromLocalStorage()


const middlewares  = [logger];
const store  = createStore(rootReducer  , applyMiddleware(...middlewares));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
