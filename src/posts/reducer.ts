import { Action } from '../utils/createAction';
import createReducer from '../utils/createReducer';
import { LIST_BLOG_SUCCESS } from './constants';

const blogReducer = createReducer({}, {
    [LIST_BLOG_SUCCESS]: (state: any, { payload }:Action) => {
        return { ...state, };
    }
});

export default blogReducer;