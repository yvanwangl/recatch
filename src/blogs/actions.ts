import {createAction, createAsyncAction} from '../utils/createAction';
import {ADD_BLOG, LIST_BLOG_REQUEST, LIST_BLOG_SUCCESS, LIST_BLOG_FAIL} from './constants';
import request from '../utils/request';

export const addBlog = createAction(ADD_BLOG);

export const listBlog = createAsyncAction({
    callApi: ()=> request('/api/blogs', {method: 'GET'}),
    types: [LIST_BLOG_REQUEST, LIST_BLOG_SUCCESS, LIST_BLOG_FAIL]
});