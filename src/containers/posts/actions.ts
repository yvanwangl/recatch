import { createAsyncAction } from '../../utils/createAction';
import { ADD_POST_SUCCESS, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL, UPLOAD_SUCCESS, MODIFY_POST_SUCCESS, DELETE_POST_SUCCESS } from './constants';
import request, { requestUpload } from '../../utils/request';

//上传图片
export const uploadCoverImg = createAsyncAction({
    callApi: (formData: any) => requestUpload('/api/upload', {
        method: 'post',
        body: formData
    }),
    types: [, UPLOAD_SUCCESS,]
});

//新增文章
export const addPost = createAsyncAction({
    callApi: (post: any) => request('/api/posts', {
        method: 'post',
        body: JSON.stringify(post)
    }),
    types: [, ADD_POST_SUCCESS,]
});

//修改文章
export const modifyPost = createAsyncAction({
    callApi: (post: any) => request(`/api/posts/${post.id}`, {
        method: 'put',
        body: JSON.stringify(post)
    }),
    types: [, MODIFY_POST_SUCCESS,]
});

//删除文章
export const deletePost = createAsyncAction({
    callApi: (postId: string) => request(`/api/posts/${postId}`, {
        method: 'delete'
    }),
    types: [, DELETE_POST_SUCCESS,]
});

//查询当前用户所有文章
export const fetchPosts = createAsyncAction({
    callApi: () => request('/api/posts/get-by-user'),
    types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAIL],
});