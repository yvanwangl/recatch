import { createAction, createAsyncAction } from '../utils/createAction';
import { ADD_POST, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL } from './constants';
import request from '../utils/request';

export const addPOST = createAction(ADD_POST);

export const FETCHPOST = createAsyncAction({
    callApi: () => request('/api/posts'),
    types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL],
});