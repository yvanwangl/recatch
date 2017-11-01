import {combineReducers} from 'redux';
import schema from './schema';

let rootReducer = combineReducers({
    orm: schema.reducer()
});

export default rootReducer;