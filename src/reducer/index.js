import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';
import orm from './orm';

let rootReducer = combineReducers({
    orm: createReducer(orm),
    ui: (state = {}, action) => state
});

export default rootReducer;