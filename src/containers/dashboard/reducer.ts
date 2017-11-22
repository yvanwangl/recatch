import { Action } from '../../utils/createAction';
import createReducer from '../../utils/createReducer';
import { FETCH_POST_SUCCESS } from './constants';

const blogReducer = createReducer({}, {
    [FETCH_POST_SUCCESS]: (state: any, { payload }:Action) => {
        return { ...state, };
    }
});

export default blogReducer;