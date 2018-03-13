import { Action } from '../../utils/createAction';
import createReducer from '../../utils/createReducer';
import { FETCH_POST_SUCCESS } from './constants';

const postReducer = createReducer({totalCount: 1, currentPage: 1}, {
    [FETCH_POST_SUCCESS]: (state: any, { payload }:Action) => {
        return { ...state, totalCount: payload.totalCount, currentPage: +payload.currentPage};
    }
});

export default postReducer;