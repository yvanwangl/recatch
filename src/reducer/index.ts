import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { createReducer } from 'redux-orm';
import ui from './ui';
import orm from './orm';

const rootReducer = combineReducers({
    orm: createReducer(orm),
    form: reduxFormReducer,
    ui: ui
} as any);

export default rootReducer;