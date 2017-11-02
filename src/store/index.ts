import StoreState from './types';
import rootReducer from '../reducer/index';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default function configStore(initialState: StoreState){
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}