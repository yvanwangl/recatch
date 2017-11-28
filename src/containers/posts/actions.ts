import { createAsyncAction } from '../../utils/createAction';
import { ADD_POST_SUCCESS, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL, UPLOAD_SUCCESS } from './constants';
import request, { requestUpload } from '../../utils/request';

//上传图片
export const uploadCoverImg = createAsyncAction({
    callApi: (formData: any) => requestUpload('/api/upload', {
        method: 'post',
        body: formData
    }),
    types: [, UPLOAD_SUCCESS, ]
});

//新增文章
export const addPost = createAsyncAction({
    callApi: (post: any) => request('/api/posts/add', {
        method: 'post',
        body: JSON.stringify(post)
    }),
    types: [, ADD_POST_SUCCESS,]
});

//查询当前用户所有文章
export const fetchPosts = createAsyncAction({
    callApi: () => request('/api/posts/get-by-user'),
    types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL],
});