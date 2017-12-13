import StoreState from './types';
import rootReducer from '../reducer';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function configStore(initialState: StoreState){
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}