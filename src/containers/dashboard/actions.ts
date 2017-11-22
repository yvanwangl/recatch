import { createAsyncAction } from '../../utils/createAction';
import { ADD_POST_SUCCESS, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL } from './constants';
import request from '../../utils/request';

//新增文章
export const addPost = createAsyncAction({
    callApi: (post: any) => request('/api/posts/add', {
        method: 'post',
        body: JSON.stringify(post)
    }),
    types: [,ADD_POST_SUCCESS,]
});

//查询所有文章
export const fetchPosts = createAsyncAction({
    callApi: () => request('/api/posts'),
    types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL],
});