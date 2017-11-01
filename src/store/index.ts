import StoreState from './types';
import rootReducer from '../reducer/index';
import {createStore} from 'redux';

export default function configStore(initialState: StoreState){
    return createStore(rootReducer, initialState);
}