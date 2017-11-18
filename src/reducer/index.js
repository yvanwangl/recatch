import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createReducer } from 'redux-orm';
import orm from './orm';

// let rootReducer = combineReducers({
//     orm: createReducer(orm),
//     ui: (state = {}, action) => state
// });

const rootReducer = combineReducers({
    orm: createReducer(orm),
    form: reduxFormReducer,
    ui: (state = {}, action) => state
});

export default rootReducer;